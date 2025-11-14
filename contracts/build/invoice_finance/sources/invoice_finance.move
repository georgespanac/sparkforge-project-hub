module invoice_finance::invoice_finance {

    use std::option::{Self, Option};
    use std::vector;
    use sui::balance::{Self as balance, Balance};
    use sui::clock::{Self as clock, Clock};
    use sui::coin::{Self as coin, Coin};
    use sui::event;
    use sui::object::{Self as object, UID, ID};
    use sui::tx_context::{Self as tx, TxContext};
    use sui::transfer;

    // --------------------------
    // Constants / Errors
    // --------------------------
    const STATUS_ISSUED: u8 = 0;
    const STATUS_FINANCED: u8 = 1;
    const STATUS_PAID: u8 = 2;
    const STATUS_DISPUTED: u8 = 3;
    const STATUS_CANCELED: u8 = 4;

    const EWrongStatus: u64 = 0;
    const ENotAuthorized: u64 = 1;
    const ETooEarly: u64 = 2;
    const ETooLate: u64 = 3;
    const EZeroAmount: u64 = 4;
    const EAlreadyFinanced: u64 = 5;
    const ENoEscrow: u64 = 6;

    // --------------------------
    // Registry (shared)
    // --------------------------
    struct OracleRegistry has key {
        id: UID,
        oracle: address,
        issuer_authority: Option<address>, // optional: issuer attestor
        default_dispute_window_secs: u64,
    }

    // One-time-witness for init on publish
    struct INVOICE_FINANCE has drop {}

    fun init(otw: INVOICE_FINANCE, ctx: &mut TxContext) {
        // The registry will be initialized separately via init_registry function
        // This is because init can only take OTW and TxContext
        let _ = otw;
        let _ = ctx;
    }

    /// Initialize the OracleRegistry after contract deployment
    /// This should be called once by the deployer
    public fun init_registry(
        oracle: address,
        issuer_authority: Option<address>,
        default_window: u64,
        ctx: &mut TxContext
    ): OracleRegistry {
        OracleRegistry {
            id: object::new(ctx),
            oracle,
            issuer_authority,
            default_dispute_window_secs: default_window,
        }
    }

    /// Share the registry object (call after init_registry)
    public fun share_registry(registry: OracleRegistry) {
        transfer::share_object(registry);
    }

    // --------------------------
    // Core data
    // --------------------------
    struct Invoice<phantom CoinType> has key {
        id: UID,
        issuer: address,
        buyer_hash: vector<u8>,
        face_value: u64,
        due_ts: u64,
        status: u8,
        financier: Option<address>,
        discount_bps: u64,
        doc_hash: vector<u8>,
        issued_at: u64,
        financed_at: Option<u64>,
        paid_at: Option<u64>,
        dispute_until: Option<u64>,
        issuance_note_hash: vector<u8>,
    }

    struct FinanceDeal<phantom CoinType> has key {
        id: UID,
        invoice_id: ID,
        purchase_price: u64,
        financier: address,
        created_at: u64,
        escrow: Option<Balance<CoinType>>,
        active: bool,
    }

    struct SettlementEscrow<phantom CoinType> has key {
        id: UID,
        invoice_id: ID,
        funds: Balance<CoinType>,
        depositor: address,
        created_at: u64,
    }

    // --------------------------
    // Events
    // --------------------------
    struct InvoiceIssued<phantom CoinType> has copy, drop {
        invoice_id: ID,
        issuer: address,
        face_value: u64,
        due_ts: u64,
        doc_hash: vector<u8>,
    }

    struct InvoiceFinanced<phantom CoinType> has copy, drop {
        invoice_id: ID,
        financier: address,
        purchase_price: u64,
        discount_bps: u64,
        financed_at: u64,
    }

    struct DisputeRaised has copy, drop {
        invoice_id: ID,
        by: address,
        at: u64,
        reason_hash: vector<u8>,
    }

    struct PaymentDeposited<phantom CoinType> has copy, drop {
        invoice_id: ID,
        amount: u64,
        depositor: address,
    }

    struct PaymentConfirmed has copy, drop {
        invoice_id: ID,
        paid_at: u64,
    }

    struct SettlementExecuted<phantom CoinType> has copy, drop {
        invoice_id: ID,
        to: address,
        amount: u64,
    }

    struct InvoiceCanceled has copy, drop {
        invoice_id: ID,
        at: u64,
    }

    // --------------------------
    // Helpers
    // --------------------------
    fun must_sender(addr: address, ctx: &TxContext) {
        assert!(tx::sender(ctx) == addr, ENotAuthorized);
    }

    fun compute_purchase_price(face_value: u64, discount_bps: u64): u64 {
        // face_value * (10000 - discount_bps) / 10000
        let base: u128 = (face_value as u128) * (10000u128 - (discount_bps as u128));
        ((base / 10000u128) as u64)
    }

    // --------------------------
    // Entry functions
    // --------------------------

    public fun issue_invoice<CoinType>(
        registry: &OracleRegistry,
        buyer_hash: vector<u8>,
        face_value: u64,
        due_ts: u64,
        discount_bps: u64,
        doc_hash: vector<u8>,
        issuance_note_hash: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(face_value > 0, EZeroAmount);
        let now = clock::timestamp_ms(clock) / 1000;
        let inv = Invoice<CoinType> {
            id: object::new(ctx),
            issuer: tx::sender(ctx),
            buyer_hash,
            face_value,
            due_ts,
            status: STATUS_ISSUED,
            financier: option::none(),
            discount_bps,
            doc_hash,
            issued_at: now,
            financed_at: option::none(),
            paid_at: option::none(),
            dispute_until: option::none(),
            issuance_note_hash,
        };
        let invoice_id = object::id(&inv);
        event::emit(InvoiceIssued<CoinType> {
            invoice_id,
            issuer: inv.issuer,
            face_value,
            due_ts,
            doc_hash: vector::empty(), // keep event small
        });
        transfer::transfer(inv, tx::sender(ctx));
        // suppress warnings
        let _ = registry;
    }

    public fun accept_finance<CoinType>(
        invoice: &mut Invoice<CoinType>,
        payment: &mut Coin<CoinType>,
        clock: &Clock,
        registry: &OracleRegistry,
        ctx: &mut TxContext
    ) {
        assert!(invoice.status == STATUS_ISSUED, EWrongStatus);
        let now = clock::timestamp_ms(clock) / 1000;
        let financier = tx::sender(ctx);
        let required = compute_purchase_price(invoice.face_value, invoice.discount_bps);

        let paid = coin::value(payment);
        assert!(paid >= required, EZeroAmount);

        // Transfer required amount to issuer; return change to financier
        let to_issuer = coin::split(payment, required, ctx);
        transfer::public_transfer(to_issuer, invoice.issuer);
        
        // Check if there's change to return
        let remaining = coin::value(payment);
        if (remaining > 0) {
            let change = coin::split(payment, remaining, ctx);
            transfer::public_transfer(change, financier);
        };

        invoice.status = STATUS_FINANCED;
        invoice.financier = option::some(financier);
        invoice.financed_at = option::some(now);

        // Optional dispute window
        let window = registry.default_dispute_window_secs;
        if (window > 0) {
            invoice.dispute_until = option::some(now + window);
        };

        event::emit(InvoiceFinanced<CoinType> {
            invoice_id: object::id(invoice),
            financier,
            purchase_price: required,
            discount_bps: invoice.discount_bps,
            financed_at: now,
        });
        let _ = registry;
    }

    public fun raise_dispute<CoinType>(
        invoice: &mut Invoice<CoinType>,
        reason_hash: vector<u8>,
        clock: &Clock,
        ctx: &TxContext
    ) {
        // Only issuer or financier can raise dispute (if financed)
        let sender = tx::sender(ctx);
        let is_party =
            sender == invoice.issuer ||
            (option::is_some(&invoice.financier) && sender == *option::borrow(&invoice.financier));
        assert!(is_party, ENotAuthorized);

        // Must be within dispute window (if set)
        if (option::is_some(&invoice.dispute_until)) {
            let now = clock::timestamp_ms(clock) / 1000;
            let until = *option::borrow(&invoice.dispute_until);
            assert!(now <= until, ETooLate);
        };

        invoice.status = STATUS_DISPUTED;
        event::emit(DisputeRaised {
            invoice_id: object::id(invoice),
            by: sender,
            at: clock::timestamp_ms(clock) / 1000,
            reason_hash,
        });
    }

    public fun deposit_payment<CoinType>(
        registry: &OracleRegistry,
        invoice: &Invoice<CoinType>,
        funds: Coin<CoinType>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Only oracle can deposit buyer payment (mocked)
        must_sender(registry.oracle, ctx);

        let amount = coin::value(&funds);
        assert!(amount > 0, EZeroAmount);

        let escrow = SettlementEscrow<CoinType> {
            id: object::new(ctx),
            invoice_id: object::id(invoice),
            funds: coin::into_balance(funds),
            depositor: tx::sender(ctx),
            created_at: clock::timestamp_ms(clock) / 1000,
        };
        event::emit(PaymentDeposited<CoinType> {
            invoice_id: escrow.invoice_id,
            amount,
            depositor: registry.oracle,
        });
        transfer::transfer(escrow, registry.oracle); // oracle keeps custody until confirm
    }

    public fun confirm_payment<CoinType>(
        registry: &OracleRegistry,
        invoice: &mut Invoice<CoinType>,
        escrow: SettlementEscrow<CoinType>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        must_sender(registry.oracle, ctx);
        assert!(invoice.status == STATUS_FINANCED, EWrongStatus);

        // Not disputed at the time of confirmation
        assert!(invoice.status != STATUS_DISPUTED, EWrongStatus);

        // Payout face_value (or whatever is available) to financier
        let financier = *option::borrow(&invoice.financier);
        let depositor_addr = escrow.depositor;
        let invoice_id = object::id(invoice);
        
        // Destructure escrow to get access to funds
        let SettlementEscrow { id, funds, depositor: _, invoice_id: _, created_at: _ } = escrow;
        
        let available = balance::value(&funds);
        let payout = if (available >= invoice.face_value) { invoice.face_value } else { available };
        
        // Split: to_financier gets payout, leftover stays in funds
        let to_financier_bal = balance::split(&mut funds, payout);
        let coin_to_financier = coin::from_balance<CoinType>(to_financier_bal, ctx);
        transfer::public_transfer(coin_to_financier, financier);

        // Return any remainder to depositor/oracle (optional: send to issuer)
        let remaining = balance::value(&funds);
        if (remaining > 0) {
            let back = coin::from_balance<CoinType>(funds, ctx);
            transfer::public_transfer(back, depositor_addr);
        } else {
            balance::destroy_zero(funds);
        };

        // Mark invoice paid
        let now = clock::timestamp_ms(clock) / 1000;
        invoice.status = STATUS_PAID;
        invoice.paid_at = option::some(now);

        event::emit(PaymentConfirmed {
            invoice_id,
            paid_at: now,
        });
        event::emit(SettlementExecuted<CoinType> {
            invoice_id,
            to: financier,
            amount: payout,
        });

        // Delete escrow object
        object::delete(id);
    }

    public fun cancel_invoice<CoinType>(
        invoice: &mut Invoice<CoinType>, 
        clock: &Clock,
        ctx: &TxContext
    ) {
        assert!(invoice.status == STATUS_ISSUED, EWrongStatus);
        assert!(tx::sender(ctx) == invoice.issuer, ENotAuthorized);
        invoice.status = STATUS_CANCELED;
        event::emit(InvoiceCanceled { 
            invoice_id: object::id(invoice), 
            at: clock::timestamp_ms(clock) / 1000 
        });
    }
}


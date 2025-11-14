# ChainInvoice - Deployment Guide

## 🎉 Smart Contract Successfully Deployed!

### Contract Information

- **Network**: Sui Testnet
- **Package ID**: `0x59a53a2ba5ab4132fa687db5b7ab0c150fdfcfd0a2beb81f8933502eb76e3034`
- **Registry ID**: `0xd2e57f2c475ffc569d4bb9ca5be9e4a14418825a235896ecb923e41cf1bc552f`
- **Oracle Address**: `0x3e5e7fbba513bfe17858488bcdb8e80b729f291dbf79be1ef3b71b96111d6ee1`
- **Transaction Digest**: `9KpW4j9voXniP2cdGd8tbaSSBJ7hxgw5P8R1Cmf9eZBK`
- **Registry Init Tx**: `DdmRaceMShYzKKcgWKVXbSxfKqFTpURzLVTQn3doeGVh`

### Explorer Links

- **Package**: https://testnet.suivision.xyz/package/0x59a53a2ba5ab4132fa687db5b7ab0c150fdfcfd0a2beb81f8933502eb76e3034
- **Registry Object**: https://testnet.suivision.xyz/object/0xd2e57f2c475ffc569d4bb9ca5be9e4a14418825a235896ecb923e41cf1bc552f

---

## 🚀 Quick Start

### 1. Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

### 2. Connect Your Wallet

1. Click the **"Connect Wallet"** button in the top-right corner
2. Select your Sui wallet (Sui Wallet, Suiet, Ethos, etc.)
3. Approve the connection request

### 3. Create Your First Invoice

1. Navigate to **"Business Dashboard"** (or click "For Businesses")
2. Go to the **"Create New"** tab
3. Fill in the invoice details:
   - **Client Name**: e.g., "Acme Corp"
   - **Invoice Amount**: e.g., 10000 (in SUI - will be converted to MIST automatically)
   - **Invoice ID**: e.g., "INV-2024-001"
   - **Due Date**: Select a future date
   - **Desired Discount %**: e.g., 5 (means 5% discount = 500 basis points)
   - **Description**: Brief description of goods/services
   - **Document Upload** (optional): Upload the invoice PDF/document

4. Click **"Tokenize Invoice"**
5. Approve the transaction in your wallet
6. Wait for confirmation ✅

---

## 📋 What Was Implemented

### Smart Contract (`invoice_finance.move`)

✅ **Core Structs**:
- `Invoice<CoinType>` - Main invoice object with all metadata
- `OracleRegistry` - Shared object for oracle configuration
- `FinanceDeal<CoinType>` - Tracks financing deals
- `SettlementEscrow<CoinType>` - Holds payment funds until settlement

✅ **Entry Functions**:
- `issue_invoice` - Create a new invoice (✅ **Integrated with frontend**)
- `accept_finance` - Financier accepts and pays for invoice
- `deposit_payment` - Oracle deposits buyer's payment
- `confirm_payment` - Oracle confirms payment and settles
- `raise_dispute` - Raise a dispute on an invoice
- `cancel_invoice` - Cancel an invoice (issuer only)

✅ **Events**:
- `InvoiceIssued` - Emitted when invoice is created
- `InvoiceFinanced` - Emitted when financier accepts
- `PaymentDeposited` - Emitted when payment deposited
- `PaymentConfirmed` - Emitted when settlement completes
- `DisputeRaised` - Emitted when dispute is raised
- `SettlementExecuted` - Emitted when funds are transferred
- `InvoiceCanceled` - Emitted when invoice is canceled

### Frontend (`React + TypeScript`)

✅ **Pages**:
- Home / Landing Page
- How It Works
- Marketplace (view available invoices)
- Business Dashboard (create & manage invoices)
- Investor Dashboard (browse & finance invoices)

✅ **Features Implemented**:
- Wallet connection (Sui Wallet Kit)
- Invoice creation form with validation (Zod + react-hook-form)
- Document hashing (SHA-256)
- Transaction building and signing
- Real-time notifications (Sonner toasts)
- Error handling with Error Boundary
- Responsive UI with Tailwind CSS + shadcn/ui

✅ **Utilities**:
- `src/lib/suiClient.ts` - Sui client configuration
- `src/lib/invoice.ts` - Invoice transaction builders & helpers
- `scripts/init_registry.ts` - Script to initialize OracleRegistry

---

## 🧪 Testing the Application

### Test Scenario: Create an Invoice

1. **Connect Wallet** (make sure you have testnet SUI)
2. Go to **Business Dashboard → Create New**
3. Enter test data:
   ```
   Client Name: Test Buyer Inc.
   Invoice Amount: 1000
   Invoice ID: TEST-001
   Due Date: 30 days from now
   Desired Discount %: 3
   Description: Test invoice for platform demo
   ```
4. Click **"Tokenize Invoice"**
5. **Expected Result**:
   - Wallet popup appears requesting signature
   - After approval: Success toast with transaction digest
   - Invoice is minted as an NFT and transferred to your address

### Verify On-Chain

Visit Sui Explorer to see your invoice object:
```
https://testnet.suivision.xyz/txblock/<your-transaction-digest>
```

---

## 📊 Invoice Object Structure

When you create an invoice, a Sui object is created with:

```move
struct Invoice<phantom CoinType> {
    id: UID,
    issuer: address,                    // Your wallet address
    buyer_hash: vector<u8>,             // Hashed buyer identifier
    face_value: u64,                    // Invoice amount in MIST
    due_ts: u64,                        // Due date (Unix timestamp)
    status: u8,                         // 0=ISSUED, 1=FINANCED, 2=PAID, 3=DISPUTED, 4=CANCELED
    financier: Option<address>,         // Financier address (if financed)
    discount_bps: u64,                  // Discount in basis points (100 = 1%)
    doc_hash: vector<u8>,               // Document hash for integrity
    issued_at: u64,                     // Creation timestamp
    financed_at: Option<u64>,           // Financing timestamp
    paid_at: Option<u64>,               // Payment timestamp
    dispute_until: Option<u64>,         // Dispute window end
    issuance_note_hash: vector<u8>,     // Additional notes hash
}
```

---

## 🔧 Technical Details

### Environment Variables

The following environment variables are configured in `.env.local`:

```bash
VITE_PACKAGE_ID=0x59a53a2ba5ab4132fa687db5b7ab0c150fdfcfd0a2beb81f8933502eb76e3034
VITE_REGISTRY_ID=0xd2e57f2c475ffc569d4bb9ca5be9e4a14418825a235896ecb923e41cf1bc552f
```

### Transaction Flow (Invoice Creation)

1. **Frontend**: User fills form and clicks "Tokenize Invoice"
2. **Validation**: Zod schema validates all inputs
3. **Hashing**: 
   - Client name → SHA-256 → buyer_hash
   - Document (if uploaded) → SHA-256 → doc_hash
   - Description → SHA-256 → issuance_note_hash
4. **Transaction Building**:
   ```typescript
   tx.moveCall({
     target: `${PACKAGE_ID}::invoice_finance::issue_invoice`,
     typeArguments: ['0x2::sui::SUI'],
     arguments: [
       registry_id,
       buyer_hash,
       face_value_in_mist,
       due_timestamp,
       discount_bps,
       doc_hash,
       issuance_note_hash,
       clock_object
     ]
   })
   ```
5. **Signing**: Wallet signs transaction
6. **Execution**: Transaction submitted to Sui network
7. **Result**: Invoice NFT minted and transferred to user

---

## 🎯 Next Steps (Post-Hackathon)

### For Financiers
- Browse marketplace
- Filter invoices by discount rate, due date, amount
- Accept financing deals
- Receive face value upon payment confirmation

### For Businesses
- View issued invoices dashboard
- Track invoice status (issued → financed → paid)
- Cancel invoices before financing
- Receive instant liquidity when financed

### Oracle Functions (Admin)
- Deposit buyer payments to escrow
- Confirm payments and trigger settlement
- Handle disputes

---

## 🛠 Development Commands

```bash
# Start frontend dev server
npm run dev

# Build Move contract
cd contracts && sui move build

# Publish to testnet
cd contracts && sui client publish --gas-budget 100000000

# Initialize registry
npm run init-registry  # or: npx tsx scripts/init_registry.ts

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🐛 Troubleshooting

### "Please connect your wallet first"
- Make sure you've clicked "Connect Wallet" and approved the connection
- Check that you're on Sui Testnet in your wallet

### "Transaction failed: Insufficient gas"
- Get testnet SUI from faucet: https://faucet.triangleplatform.com/sui/testnet
- Or use: `sui client faucet`

### "Package ID not found"
- Verify `.env.local` exists and contains correct IDs
- Restart the Vite dev server: `npm run dev`

### Frontend shows empty page
- Check browser console (F12) for errors
- Verify Vite server is running on http://localhost:8080
- Check that all imports are correct

---

## 📝 Key Files

### Smart Contract
- `contracts/sources/invoice_finance.move` - Main contract
- `contracts/Move.toml` - Package configuration

### Frontend
- `src/pages/BusinessDashboard.tsx` - Invoice creation UI
- `src/lib/invoice.ts` - Transaction builders
- `src/lib/suiClient.ts` - Sui client setup
- `src/App.tsx` - Main app with wallet provider

### Scripts
- `scripts/init_registry.ts` - Registry initialization

---

## 🎓 Learning Resources

- [Sui Move Documentation](https://docs.sui.io/concepts/sui-move-concepts)
- [Sui TypeScript SDK](https://sdk.mystenlabs.com/typescript)
- [Wallet Kit Integration](https://sui-wallet-kit.vercel.app/)
- [Sui Explorer (Testnet)](https://testnet.suivision.xyz/)

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify wallet is connected to Sui Testnet
3. Ensure you have testnet SUI for gas
4. Review this guide for common solutions

---

**Built with ❤️ for Sui Hackathon**

Happy building! 🚀


import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, REGISTRY_ID } from './suiClient';

export interface InvoiceFormData {
  clientName: string;
  amount: number;
  invoiceId: string;
  dueDate: string;
  discount: number;
  description?: string;
}

export interface InvoiceIssuanceParams {
  buyerHash: Uint8Array;
  faceValue: number;
  dueTimestamp: number;
  discountBps: number;
  docHash: Uint8Array;
  issuanceNoteHash: Uint8Array;
}

/**
 * Hash a string to bytes using SHA-256
 */
export async function hashString(input: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
}

/**
 * Generate hash from file content
 */
export async function hashFile(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  return new Uint8Array(hashBuffer);
}

/**
 * Create a transaction for issuing an invoice
 */
export function createIssueInvoiceTransaction(
  params: InvoiceIssuanceParams,
  clockId: string = '0x6' // Default Sui clock object ID
): Transaction {
  const tx = new Transaction();

  // For demo, we'll use SUI as the coin type
  // In production, you'd use a stablecoin type parameter
  const coinType = '0x2::sui::SUI'; // SUI coin type

  // Build the transaction
  tx.moveCall({
    target: `${PACKAGE_ID}::invoice_finance::issue_invoice`,
    typeArguments: [coinType],
    arguments: [
      tx.object(REGISTRY_ID), // registry
      tx.pure.vector('u8', Array.from(params.buyerHash)), // buyer_hash
      tx.pure.u64(params.faceValue), // face_value (in smallest unit, e.g., MIST for SUI)
      tx.pure.u64(params.dueTimestamp), // due_ts
      tx.pure.u64(params.discountBps), // discount_bps
      tx.pure.vector('u8', Array.from(params.docHash)), // doc_hash
      tx.pure.vector('u8', Array.from(params.issuanceNoteHash)), // issuance_note_hash
      tx.object(clockId), // clock
    ],
  });

  return tx;
}

/**
 * Convert form data to invoice issuance parameters
 */
export async function formDataToInvoiceParams(
  formData: InvoiceFormData,
  docHash?: Uint8Array
): Promise<InvoiceIssuanceParams> {
  // Convert amount to smallest unit (MIST for SUI: 1 SUI = 1,000,000,000 MIST)
  // For demo, assuming amount is in USD and we'll use a 1:1 conversion
  // In production, you'd use proper stablecoin conversion
  const faceValue = Math.floor(formData.amount * 1_000_000_000); // Convert to MIST

  // Convert discount percentage to basis points (1% = 100 bps)
  const discountBps = Math.floor(formData.discount * 100);

  // Convert due date to Unix timestamp (seconds)
  const dueTimestamp = Math.floor(new Date(formData.dueDate).getTime() / 1000);

  // Hash buyer/client name
  const buyerHash = await hashString(formData.clientName);

  // Use provided doc hash or generate from description
  const finalDocHash = docHash || await hashString(formData.description || formData.invoiceId);

  // Hash issuance note (can include invoice ID and other metadata)
  const issuanceNoteHash = await hashString(`${formData.invoiceId}-${formData.clientName}-${Date.now()}`);

  return {
    buyerHash,
    faceValue,
    dueTimestamp,
    discountBps,
    docHash: finalDocHash,
    issuanceNoteHash,
  };
}


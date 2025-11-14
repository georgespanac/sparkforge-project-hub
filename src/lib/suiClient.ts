import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

// Use testnet for development
const NETWORK = 'testnet';

export const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK),
});

// Contract package ID - update this after deploying the contract
// For now, use a placeholder that won't break the UI
export const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID || '0x0';

// Registry object ID - update this after initializing the contract
// For now, use a placeholder that won't break the UI
export const REGISTRY_ID = import.meta.env.VITE_REGISTRY_ID || '0x0';


import { Transaction } from '@mysten/sui/transactions';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { fromBase64 } from '@mysten/sui/utils';
import { bcs } from '@mysten/sui/bcs';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const PACKAGE_ID = '0x59a53a2ba5ab4132fa687db5b7ab0c150fdfcfd0a2beb81f8933502eb76e3034';

async function initRegistry() {
  // Connect to testnet
  const client = new SuiClient({ url: getFullnodeUrl('testnet') });

  // Load keypair from Sui config
  const configPath = path.join(os.homedir(), '.sui', 'sui_config', 'sui.keystore');
  const keystore = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  // Get the first keypair (adjust if needed)
  const privateKeyBase64 = keystore[0];
  const privateKey = fromBase64(privateKeyBase64);
  const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(1));
  
  const sender = keypair.toSuiAddress();
  console.log('Sender address:', sender);

  // Create transaction
  const tx = new Transaction();

  // Call init_registry and capture the result
  // For Option<address>, use bcs to encode None (empty vector) or Some(address)
  const [registry] = tx.moveCall({
    target: `${PACKAGE_ID}::invoice_finance::init_registry`,
    arguments: [
      tx.pure.address(sender), // oracle address (use deployer for now)
      tx.pure(bcs.option(bcs.Address).serialize(null).toBytes()), // issuer_authority (empty Option)
      tx.pure.u64(604800), // default_dispute_window_secs (7 days)
    ],
  });

  // Share the registry
  tx.moveCall({
    target: `${PACKAGE_ID}::invoice_finance::share_registry`,
    arguments: [registry],
  });

  // Execute transaction
  console.log('Executing transaction...');
  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  });

  console.log('\n✅ Transaction successful!');
  console.log('Digest:', result.digest);
  console.log('\nObject Changes:');
  
  // Find the shared object (OracleRegistry)
  const sharedObj = result.objectChanges?.find(
    (obj) => obj.type === 'created' && 'objectType' in obj && obj.objectType.includes('OracleRegistry')
  );

  if (sharedObj && 'objectId' in sharedObj) {
    console.log('\n🎯 OracleRegistry ID:', sharedObj.objectId);
    console.log('\nAdd this to your .env file:');
    console.log(`VITE_PACKAGE_ID=${PACKAGE_ID}`);
    console.log(`VITE_REGISTRY_ID=${sharedObj.objectId}`);
  } else {
    console.log('\nAll object changes:');
    console.log(JSON.stringify(result.objectChanges, null, 2));
  }
}

initRegistry().catch(console.error);


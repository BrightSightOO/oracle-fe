import { NATIVE_MINT } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

export const QUOTE_TOKEN = new PublicKey(
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
);

export const HOGP_TOKEN = new PublicKey(
  'HogPo6FEJLBuovJ1suCTw3Yb42i74gnN4KWk1oGHsuqL'
);

export const MINT_PUBKEY_TO_DECIMAL = {
  [NATIVE_MINT.toBase58()]: 9,
  [QUOTE_TOKEN.toBase58()]: 6,
  [HOGP_TOKEN.toBase58()]: 9,
};

export const TOKEN_TYPES = {
  SOL: NATIVE_MINT,
  USDC: QUOTE_TOKEN,
  HOGP: HOGP_TOKEN,
};

export const MINT_PUBKEY_TO_NAME = {
  [NATIVE_MINT.toBase58()]: 'SOL',
  [QUOTE_TOKEN.toBase58()]: 'USDC',
  [HOGP_TOKEN.toBase58()]: 'HOGP',
};

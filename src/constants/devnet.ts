import { PublicKey, publicKey } from '@metaplex-foundation/umi';
import { NATIVE_MINT } from '@solana/spl-token';

export const QUOTE_TOKEN =
  '3aMbgP7aGsP1sVcFKc6j65zu7UiziP57SMFzf6ptiCSX' as PublicKey<'3aMbgP7aGsP1sVcFKc6j65zu7UiziP57SMFzf6ptiCSX'>;

export const HOGP_TOKEN =
  'HogPo6FEJLBuovJ1suCTw3Yb42i74gnN4KWk1oGHsuqL' as PublicKey<'HogPo6FEJLBuovJ1suCTw3Yb42i74gnN4KWk1oGHsuqL'>;

export const OPTIMISTIC_ORACLE =
  'DVMysqEbKDZdaJ1AVcmAqyVfvvZAMFwUkEQsNMQTvMZg' as PublicKey<'DVMysqEbKDZdaJ1AVcmAqyVfvvZAMFwUkEQsNMQTvMZg'>;

const nativeMintString = NATIVE_MINT.toBase58();

export const MINT_PUBKEY_TO_DECIMAL = {
  [nativeMintString]: 9,
  [QUOTE_TOKEN]: 6,
  [HOGP_TOKEN]: 9,
};

export const TOKEN_TYPES = {
  SOL: publicKey(nativeMintString),
  USDC: QUOTE_TOKEN,
  HOGP: HOGP_TOKEN,
};

export const MINT_PUBKEY_TO_NAME = {
  [nativeMintString]: 'SOL',
  [QUOTE_TOKEN]: 'USDC',
  [HOGP_TOKEN]: 'HOGP',
};

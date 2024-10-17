import { createAmount, type Amount, type PublicKey } from "@metaplex-foundation/umi";

export type MintInfo = {
  readonly identifier: string;
  readonly decimals: number;
};

export const WSOL =
  "So11111111111111111111111111111111111111112" as PublicKey<"So11111111111111111111111111111111111111112">;

export const WSOL_2022 =
  "9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP" as PublicKey<"9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP">;

export const USDC =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" as PublicKey<"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v">;

export const DEVNET_STABLE_HOG =
  "3aMbgP7aGsP1sVcFKc6j65zu7UiziP57SMFzf6ptiCSX" as PublicKey<"3aMbgP7aGsP1sVcFKc6j65zu7UiziP57SMFzf6ptiCSX">;

export const HOGP =
  "HogPo6FEJLBuovJ1suCTw3Yb42i74gnN4KWk1oGHsuqL" as PublicKey<"HogPo6FEJLBuovJ1suCTw3Yb42i74gnN4KWk1oGHsuqL">;

const MINT_INFO: Record<PublicKey, MintInfo> = {
  [WSOL]: { identifier: "SOL", decimals: 9 },
  [WSOL_2022]: { identifier: "SOL", decimals: 9 },
  [USDC]: { identifier: "USDC", decimals: 6 },
  [DEVNET_STABLE_HOG]: { identifier: "SHOG", decimals: 6 },
  [HOGP]: { identifier: "HOGP", decimals: 9 },
};

export function getMintInfo(mint: PublicKey): MintInfo {
  const info = MINT_INFO[mint];
  if (info !== undefined) {
    return info;
  }
  throw new Error(`Missing mint info for '${mint}'`);
}

export function getTokenAmount(mint: PublicKey, basisPoints: bigint): Amount {
  const { identifier, decimals } = getMintInfo(mint);
  return { basisPoints, identifier, decimals };
}

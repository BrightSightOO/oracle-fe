import { RequestState } from '@/program-sdks/oracle';
import { Amount, PublicKey } from '@metaplex-foundation/umi';

type OracleType = 'Parimutuel Markets';

export interface iOracle {
  title: string;
  description: string;
  chain: 'Solana';
  oracleType: OracleType;
  requestOutcome: string[];
  request: PublicKey;
  state: RequestState;
  requestedTime: bigint;
  bond: Amount;
  bondMint: PublicKey;
  reward: Amount;
  creator: PublicKey;
  assertedTime: bigint | undefined;
  expirationTime: bigint | undefined;
  asserter: PublicKey | undefined;
  // No 0n, Yes 1n or undefined if assert account does not exist
  assertedValue: bigint | undefined;
  disputedValue: bigint | undefined;
  resolvedTime: bigint | undefined;
}

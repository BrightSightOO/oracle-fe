import type { Context, Pda, PublicKey } from "@metaplex-foundation/umi";

import { publicKey, string } from "@metaplex-foundation/umi/serializers";

import { getOptimisticOracleProgramId } from "../generated/programs/optimisticOracle";

export function findStakePoolPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the oracle governance token mint. */
    mint: PublicKey;
  },
): Pda {
  const programId = getOptimisticOracleProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("stake_pool"),
    publicKey().serialize(seeds.mint),
  ]);
}

export function findRewardPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the request. */
    request: PublicKey;
  },
): Pda {
  const programId = getOptimisticOracleProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("reward"),
    publicKey().serialize(seeds.request),
  ]);
}

export function findAssertBondPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the request. */
    request: PublicKey;
  },
): Pda {
  const programId = getOptimisticOracleProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("assert_bond"),
    publicKey().serialize(seeds.request),
  ]);
}

export function findDisputeBondPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the request. */
    request: PublicKey;
  },
): Pda {
  const programId = getOptimisticOracleProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("dispute_bond"),
    publicKey().serialize(seeds.request),
  ]);
}

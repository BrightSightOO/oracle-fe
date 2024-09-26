/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import type { ResolvedAccount, ResolvedAccountsWithIndices } from "../shared";
import type { ResolveArgs, ResolveArgsArgs } from "../types";
import type { Context, Pda, PublicKey, TransactionBuilder } from "@metaplex-foundation/umi";
import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { transactionBuilder } from "@metaplex-foundation/umi";
import { mapSerializer, struct, u8 } from "@metaplex-foundation/umi/serializers";

import { findResolverPda } from "../accounts";
import { expectPublicKey, getAccountMetasAndSigners } from "../shared";
import { getResolveArgsSerializer } from "../types";

// Accounts.
export type ResolveInstructionAccounts = {
  /** Resolver */
  resolver?: PublicKey | Pda;
  /** Parimutuel market */
  market: PublicKey | Pda;
  /** Oracle request */
  request: PublicKey | Pda;
  /** Parimutuel program */
  parimutuelProgram?: PublicKey | Pda;
};

// Data.
export type ResolveInstructionData = {
  discriminator: number;
  resolveArgs: ResolveArgs;
};

export type ResolveInstructionDataArgs = { resolveArgs: ResolveArgsArgs };

export function getResolveInstructionDataSerializer(): Serializer<
  ResolveInstructionDataArgs,
  ResolveInstructionData
> {
  return mapSerializer<ResolveInstructionDataArgs, any, ResolveInstructionData>(
    struct<ResolveInstructionData>(
      [
        ["discriminator", u8()],
        ["resolveArgs", getResolveArgsSerializer()],
      ],
      { description: "ResolveInstructionData" },
    ),
    (value) => ({ ...value, discriminator: 1 }),
  );
}

// Args.
export type ResolveInstructionArgs = ResolveInstructionDataArgs;

// Instruction.
export function resolve(
  context: Pick<Context, "eddsa" | "programs">,
  input: ResolveInstructionAccounts & ResolveInstructionArgs,
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    "parimutuelResolver",
    "RS1njPGQsykXyyPGUiAC9dvPyoqw73vtMFPJhipibj1",
  );

  // Accounts.
  const resolvedAccounts = {
    resolver: {
      index: 0,
      isWritable: false as boolean,
      value: input.resolver ?? null,
    },
    market: {
      index: 1,
      isWritable: true as boolean,
      value: input.market ?? null,
    },
    request: {
      index: 2,
      isWritable: false as boolean,
      value: input.request ?? null,
    },
    parimutuelProgram: {
      index: 3,
      isWritable: false as boolean,
      value: input.parimutuelProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: ResolveInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.resolver.value) {
    resolvedAccounts.resolver.value = findResolverPda(context, {
      market: expectPublicKey(resolvedAccounts.market.value),
    });
  }
  if (!resolvedAccounts.parimutuelProgram.value) {
    resolvedAccounts.parimutuelProgram.value = context.programs.getPublicKey(
      "hplParimutuel",
      "Cf9JrByfmw6CYSry39pfg2BSGHRgde2Cp5y6yZ3a2Yeo",
    );
    resolvedAccounts.parimutuelProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: Array<ResolvedAccount> = Object.values(resolvedAccounts).sort(
    (a, b) => a.index - b.index,
  );

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, "programId", programId);

  // Data.
  const data = getResolveInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}

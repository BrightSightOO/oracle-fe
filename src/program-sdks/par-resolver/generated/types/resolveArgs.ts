/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { scalarEnum } from "@metaplex-foundation/umi/serializers";

export enum ResolveArgs {
  V1,
}

export type ResolveArgsArgs = ResolveArgs;

export function getResolveArgsSerializer(): Serializer<ResolveArgsArgs, ResolveArgs> {
  return scalarEnum<ResolveArgs>(ResolveArgs, {
    description: "ResolveArgs",
  }) as Serializer<ResolveArgsArgs, ResolveArgs>;
}

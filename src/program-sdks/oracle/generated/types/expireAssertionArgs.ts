/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { scalarEnum } from "@metaplex-foundation/umi/serializers";

export enum ExpireAssertionArgs {
  V1,
}

export type ExpireAssertionArgsArgs = ExpireAssertionArgs;

export function getExpireAssertionArgsSerializer(): Serializer<
  ExpireAssertionArgsArgs,
  ExpireAssertionArgs
> {
  return scalarEnum<ExpireAssertionArgs>(ExpireAssertionArgs, {
    description: "ExpireAssertionArgs",
  }) as Serializer<ExpireAssertionArgsArgs, ExpireAssertionArgs>;
}

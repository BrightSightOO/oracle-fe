/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { scalarEnum } from "@metaplex-foundation/umi/serializers";

export enum RequestState {
  Requested,
  Asserted,
  Disputed,
  Resolved,
}

export type RequestStateArgs = RequestState;

export function getRequestStateSerializer(): Serializer<RequestStateArgs, RequestState> {
  return scalarEnum<RequestState>(RequestState, {
    description: "RequestState",
  }) as Serializer<RequestStateArgs, RequestState>;
}

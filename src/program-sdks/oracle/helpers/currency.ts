import type { Bounds } from "../generated";

import { NumberOutOfRangeError } from "@metaplex-foundation/umi/serializers";

const U64_MIN = 0n;
const U64_MAX = 0xffffffff_ffffffffn;

function assertU64(value: number | bigint) {
  if (value < U64_MIN || value >= U64_MAX) {
    throw new NumberOutOfRangeError("u64", U64_MIN, U64_MAX, value);
  }
  return BigInt(value);
}

/**
 * Creates `Bounds` from given start and optional end.
 *
 * @param start The lower bound of the range (inclusive).
 * @param end The upper bound of the range (exclusive).
 */
export function bounds(start: number | bigint, end?: number | bigint): Bounds {
  start = assertU64(start);
  end = assertU64(end ?? U64_MAX);

  return { start, end };
}

import type { Amount } from "@metaplex-foundation/umi";

/** Parses a decimal number as an `Amount`. */
export function parseAmount(decimalAmount: string): Amount | undefined;
export function parseAmount<I extends string>(
  decimalAmount: string,
  identifier: I,
): Amount<I> | undefined;
export function parseAmount<I extends string, D extends number>(
  decimalAmount: string,
  identifier: I,
  decimals: D,
): Amount<I, D> | undefined;

export function parseAmount(
  decimalAmount: string,
  identifier = "splToken",
  decimals?: number,
): Amount | undefined {
  if (decimalAmount === "") {
    return;
  }

  let digits = decimalAmount;
  let parsedDecimals = 0;

  const dot = digits.indexOf(".");
  if (dot !== -1) {
    parsedDecimals = digits.length - dot - 1;
    digits = digits.slice(0, dot) + digits.slice(dot + 1);
  }

  if (digits === "") {
    return;
  }

  let basisPoints: bigint;
  try {
    basisPoints = BigInt(digits);
  } catch {
    return;
  }

  if (typeof decimals !== "number" || decimals === parsedDecimals) {
    return { basisPoints, identifier, decimals: parsedDecimals };
  }

  return {
    basisPoints: scaleBasisPoints(basisPoints, parsedDecimals, decimals),
    identifier,
    decimals,
  };
}

/** Converts the given `Amount`, scaling to match the new decimals. */
export function convertAmount<I extends string, D extends number>(
  amount: Amount<I>,
  decimals: D,
): Amount<I, D>;
export function convertAmount<I extends string, D extends number>(
  amount: Amount,
  decimals: D,
  identifier: I,
): Amount<I, D>;

export function convertAmount(
  amount: Amount,
  decimals: number,
  identifier: string = amount.identifier,
): Amount {
  return {
    basisPoints: scaleBasisPoints(amount.basisPoints, amount.decimals, decimals),
    identifier,
    decimals,
  };
}

/** Scales basis points from input decimals to output decimals. */
export function scaleBasisPoints(
  basisPoints: bigint,
  fromDecimals: number,
  toDecimals: number,
): bigint {
  if (fromDecimals === toDecimals) {
    return basisPoints;
  } else if (fromDecimals < toDecimals) {
    const multiplier = 10n ** BigInt(toDecimals - fromDecimals);

    return basisPoints * multiplier;
  } else {
    const multiplier = 10n ** BigInt(toDecimals);
    const divisor = 10n ** BigInt(fromDecimals);

    return (basisPoints * multiplier) / divisor;
  }
}

export function prettyDecimal(value: Omit<Amount, "identifier">): string {
  let sign = "";
  let basisPoints = value.basisPoints;

  if (basisPoints < 0) {
    sign = "-";
    basisPoints = -basisPoints;
  }

  const digits = basisPoints.toString();
  const units = digits.slice(0, -value.decimals) || "0";

  let decimals = digits.slice(-value.decimals).padStart(value.decimals, "0");
  while (decimals.endsWith("0")) {
    decimals = decimals.slice(0, -1);
  }

  return decimals === "" ? `${sign}${units}` : `${sign}${units}.${decimals}`;
}

export function prettyAmount(amount: Amount): string {
  const decimal = prettyDecimal(amount);
  const { identifier } = amount;

  switch (identifier) {
    case "%":
      return `${decimal}%`;
    case "splToken":
      return `${decimal} Tokens`;
    default:
      return `${decimal} ${identifier.startsWith("splToken.") ? identifier.slice(9) : identifier}`;
  }
}

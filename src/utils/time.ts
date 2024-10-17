import { DateTime } from "@metaplex-foundation/umi";

export const shortDateFmt = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatDate(
  date: Date | DateTime,
  formatter: Intl.DateTimeFormat = shortDateFmt,
): string {
  switch (typeof date) {
    case "bigint":
      return formatter.format(Number(date * 1000n));
    default:
      return formatter.format(date);
  }
}

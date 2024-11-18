export const stripSuffix = (s: string, suffix: string) =>
  s.endsWith(suffix) ? s.slice(0, s.length - suffix.length) : s;

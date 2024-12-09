export const SECONDS_MS = 1000;
export const MINUTES_SECONDS = 60;
export const HOURS_SECONDS = 3600;
export const DAYS_SECONDS = 86400;
export const WEEK_SECONDS = DAYS_SECONDS * 7;
export const MONTH_SECONDS = WEEK_SECONDS * 4;

export const DAILY_MAX_POINTS = 100;
export const POINTS_PER_RESPONSE = 10;

export const TIME_CHART_OPTIONS: { [key: string]: number } = {
  '1W': WEEK_SECONDS * SECONDS_MS,
  '1M': MONTH_SECONDS * SECONDS_MS,
  '3M': MONTH_SECONDS * SECONDS_MS * 3,
  '6M': MONTH_SECONDS * SECONDS_MS * 6,
  '1Y': MONTH_SECONDS * SECONDS_MS * 12,
  ALL: new Date().getTime(),
};

export const formatShortDate = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'numeric',
  year: '2-digit',
});

export const formatLongDate = new Intl.DateTimeFormat('en-US', {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
  timeZone: 'UTC',
});

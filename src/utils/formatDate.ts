const defaultOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export function formatDate(timeStamp: Date, locale = 'fr', options = defaultOptions) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(timeStamp));
}

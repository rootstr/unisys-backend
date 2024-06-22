const ORIGIN_PATTERN = /https?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}(\.[a-z]{2,4}|\d{1,5})\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;

export const parseCorsOrigins = (origins: string): string[] => {
  const originList = origins
    .split(";")
    .map(origin => origin.trim());

  const validOrigins = originList.filter(origin => {
    return ORIGIN_PATTERN.test(origin);
  });

  return validOrigins;
};
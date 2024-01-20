// prettier-ignore
export const formatStr = (str: string): string =>
  str.replace(/[^a-z0-9]/gi, '')
    .toLowerCase();

type SearchParams = {
  [key: string]: string;
};

// prettier-ignore
export function injectParams(
  url: URL,
  params: SearchParams
) {
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
}

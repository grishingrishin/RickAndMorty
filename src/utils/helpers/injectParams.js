export function injectParams(url, params) {
	Object.keys(params).forEach(key => {
		url.searchParams.append(key, params[key]);
	});
}

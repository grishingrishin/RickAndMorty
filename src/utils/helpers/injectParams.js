export function injectParams(url, params) {
	Object.keys(params).forEach(key => {
		if (params[key]) {
			url.searchParams.append(key, params[key]);
		}
	});
}

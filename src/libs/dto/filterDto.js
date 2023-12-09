export function filterDto(params = {}) {
	return {
		status: params.status ?? '',
		gender: params.gender ?? '',
	};
}

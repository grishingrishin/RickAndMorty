export function cardDto(data = {}) {
	return {
		picture: data.image ?? '',
		name: data.name ?? '',
		status: data.status ?? '',
		gender: data.gender ?? '',
		episodes: data.episode ?? [],
	};
}

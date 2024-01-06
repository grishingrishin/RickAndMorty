export function characterDto(data = {}) {
	return {
		id: data.id ?? null,
		picture: data.image ?? '',
		name: data.name ?? '',
		status: data.status ?? '',
		gender: data.gender ?? '',
		episodes: data.episode ?? [],
	};
}

import type { Character } from '@/libs/types';

// prettier-ignore
export function characterDto(
  data: Partial<Character> = {}
): Character {
  return {
    id: data.id ?? null,
    image: data.image ?? '',
    name: data.name ?? '',
    status: data.status ?? '',
    gender: data.gender ?? '',
    episode: data.episode ?? [],
  };
}

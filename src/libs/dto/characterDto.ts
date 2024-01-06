import type { Character } from '@/libs/types';

type CharacterDto = {
  id?: number | null;
  image?: string;
  name?: string;
  status?: string;
  gender?: string;
  episode?: string[];
};

// prettier-ignore
export function characterDto(
  data: CharacterDto = {}
): Character {
  return {
    id: data.id ?? null,
    picture: data.image ?? '',
    name: data.name ?? '',
    status: data.status ?? '',
    gender: data.gender ?? '',
    episodes: data.episode ?? [],
  };
}

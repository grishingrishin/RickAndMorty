import type { FilterParams } from '@/libs/types';

type FilterDto = {
  status?: string;
  gender?: string;
};

// prettier-ignore
export function filterDto(
  params: FilterDto = {}
): FilterParams {
  return {
    status: params.status ?? '',
    gender: params.gender ?? '',
  };
}

import type { FilterParams } from '@/libs/types';

// prettier-ignore
export function filterDto(
  params: Partial<FilterParams> = {}
): FilterParams {
  return {
    status: params.status ?? '',
    gender: params.gender ?? '',
  };
}

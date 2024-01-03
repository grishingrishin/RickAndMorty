import { describe, test, expect } from 'vitest';
import { API_URL } from '@/utils/constants';
import { injectParams } from '@/utils/helpers';

describe('injectParams', () => {
	test('Injecting params into URL', () => {
		const endpoint = new URL(API_URL);

		injectParams(endpoint, {
			gender: 'female',
			status: 'alive',
		});

		expect(endpoint)
			.toMatchObject({
				search: '?gender=female&status=alive',
			});
	});
});

import { describe, test, expect } from 'vitest';
import { formatStr } from '@/utils/helpers';

describe('formatStr', () => {
	test('Convert to lower case', () => {
		expect(formatStr('aBc')).toBe('abc');
	});

	test('Deleting special characters', () => {
		expect(formatStr('123)(!?')).toBe('123');
	});
});

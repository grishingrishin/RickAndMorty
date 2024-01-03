import { afterEach, describe, test, expect, vi } from 'vitest';
import { throttle } from '@/utils/helpers';

describe('throttle', () => {
	const THROTTLE_TIMEOUT = 1000;

	afterEach(() => {
		vi.useFakeTimers();
	});

	test('Calling a function with passed parameters', () => {
		const fnSpy = vi.fn();
		const throttled = throttle(fnSpy, THROTTLE_TIMEOUT);

		throttled('Goodbye world');

		expect(fnSpy).toBeCalledWith('Goodbye world');
		expect(fnSpy).toHaveBeenCalledTimes(1);
	});

	test('Canceling a function call before the timer expires', () => {
		const fnSpy = vi.fn();
		const throttled = throttle(fnSpy, THROTTLE_TIMEOUT);

		throttled();

		vi.advanceTimersByTime(THROTTLE_TIMEOUT / 2);

		throttled('Catch me if you can');
		vi.advanceTimersByTime(THROTTLE_TIMEOUT / 2);

		throttled();

		expect(fnSpy).not.toBeCalledWith('Catch me if you can');
		expect(fnSpy).toHaveBeenCalledTimes(2);
	});
});

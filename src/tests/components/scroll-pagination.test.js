import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import { genEvent } from '@/tests/utils';

import ScrollPagination from '@/components/ScrollPagination.vue';

describe('ScrollPagination', () => {
	const EMITTING_EVENTS = {
		update: 'update',
	};

	test('Mounted pure component', () => {
		expect(ScrollPagination).toBeTruthy();

		const wrapper = mount(ScrollPagination);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Emitting an update event', () => {
		expect(ScrollPagination).toBeTruthy();

		const wrapper = mount(ScrollPagination);

		genEvent('scroll');

		expect(wrapper.emitted()).toHaveProperty(EMITTING_EVENTS.update);
	});

	test('Disabled emitting an update event', () => {
		expect(ScrollPagination).toBeTruthy();

		const wrapper = mount(ScrollPagination, {
			props: {
				disabled: true,
			},
		});

		genEvent('scroll');

		expect(wrapper.emitted()).not.toHaveProperty(EMITTING_EVENTS.update);
	});
});

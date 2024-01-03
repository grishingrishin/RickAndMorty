import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import ScrollPagination from '@/components/ScrollPagination.vue';

describe('ScrollPagination', () => {
	test('Mounted pure component', () => {
		expect(ScrollPagination).toBeTruthy();

		const wrapper = mount(ScrollPagination);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Emitting an update event', () => {
		expect(ScrollPagination).toBeTruthy();

		const wrapper = mount(ScrollPagination);

		genEvent('scroll');

		expect(wrapper.emitted()).toHaveProperty('update');
	});

	test('Disabled emitting an update event', () => {
		expect(ScrollPagination).toBeTruthy();

		const wrapper = mount(ScrollPagination, {
			props: {
				disabled: true,
			},
		});

		genEvent('scroll');

		expect(wrapper.emitted()).not.toHaveProperty('update');
	});

	function genEvent(evtName, params) {
		const customEvent = new CustomEvent(evtName, params);
		window.dispatchEvent(customEvent);
	}
});

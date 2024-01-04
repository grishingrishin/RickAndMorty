import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

import { LOCAL_STORAGE_FILTER } from '@/utils/constants';
import { getMockCharacters } from '@/tests/libs';
import { genEvent } from '@/tests/utils';

import App from '@/App.vue';

beforeEach(() => {
	vi.spyOn(global, 'fetch').mockImplementation(fetchSpy(getMockCharacters()));

	function fetchSpy(data) {
		return function (_url) {
			return new Promise(resolve => {
				resolve({
					json: () =>
						Promise.resolve({
							...data,
						}),
				});
			});
		};
	}
});

afterEach(async () => {
	await vi.resetAllMocks();
});

// prettier-ignore
describe('App', () => {
	test('Mounted component pure component', () => {
		expect(App).toBeTruthy();

		const wrapper = mount(App);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Mounted component with characters', async () => {
		expect(App).toBeTruthy();

		const wrapper = mount(App);
		await flushPromises();

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Fetch characters after scroll', async () => {
		expect(App).toBeTruthy();

		const wrapper = mount(App);
		await flushPromises();

		genEvent('scroll');
		await flushPromises();

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Restore previously applied filters (with available values)', async () => {
		const stubValues = {
			status: 'alive',
			gender: 'female',
		};

		expect(App).toBeTruthy();

		window.localStorage.setItem(LOCAL_STORAGE_FILTER, JSON.stringify(stubValues));

		const wrapper = mount(App);
		await flushPromises();

		expect(wrapper.html()).toMatchSnapshot();

		window.localStorage.removeItem(LOCAL_STORAGE_FILTER);
	});

	test('Restore previously applied filters (with unavaliable values)', async () => {
		const stubValues = {
			status: 'foo',
			gender: 'bar',
		};

		expect(App).toBeTruthy();

		window.localStorage.setItem(LOCAL_STORAGE_FILTER, JSON.stringify(stubValues));

		const wrapper = mount(App);
		await flushPromises();

		expect(wrapper.html()).toMatchSnapshot();

		window.localStorage.removeItem(LOCAL_STORAGE_FILTER);
	});

	test('Clear previously applied filters', async () => {
		const stubValues = {
			status: 'alive',
			gender: 'female',
		};

		expect(App).toBeTruthy();

		window.localStorage.setItem(LOCAL_STORAGE_FILTER, JSON.stringify(stubValues));

		const wrapper = mount(App);
		await flushPromises();

		expect(wrapper.html()).toMatchSnapshot();

		await wrapper
			.find('[data-filter=clear]')
			.trigger('click');

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Applying selected filters (with characters)', async () => {
		const stubValues = {
			status: 'alive',
			gender: 'female',
		};

		expect(App).toBeTruthy();

		const wrapper = mount(App);
		await flushPromises();

		expect(wrapper.html()).toMatchSnapshot();

		await wrapper
			.find('[data-filter=status]')
			.setValue(stubValues.status);
		await wrapper
			.find('[data-filter=gender]')
			.setValue(stubValues.gender);
		await wrapper
			.find('[data-filter=apply]')
			.trigger('click');

		expect(wrapper.html()).toMatchSnapshot();
	});

	// FIXME: Doesn't reset previos state
	test('Applying selected filters (without characters)', async () => {
		const stubValues = {
			status: 'dead',
			gender: 'male',
		};

		expect(App).toBeTruthy();

		const wrapper = mount(App);
		await flushPromises();

		expect(wrapper.html()).toMatchSnapshot();

		await wrapper
			.find('[data-filter=status]')
			.setValue(stubValues.status);
		await wrapper
			.find('[data-filter=gender]')
			.setValue(stubValues.gender);
		await wrapper
			.find('[data-filter=apply]')
			.trigger('click');

		expect(wrapper.html()).toMatchSnapshot();
	});
});

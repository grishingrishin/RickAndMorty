import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { filterDto } from '@/libs/dto';

import CharacterFilter from '@/components/CharacterFilter.vue';

describe('CharacterFilter', () => {
	const stubValues = filterDto({
		status: 'alive',
		gender: 'female',
	});

	test('Mounted pure component', () => {
		expect(CharacterFilter).toBeTruthy();

		const wrapper = mount(CharacterFilter);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Mounted component with initial state', () => {
		expect(CharacterFilter).toBeTruthy();

		const wrapper = mount(CharacterFilter, {
			props: {
				value: {
					...stubValues,
				},
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	// prettier-ignore
	test('Apply filters', async () => {
		expect(CharacterFilter).toBeTruthy();

		const wrapper = mount(CharacterFilter);

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

		const [appliedValues] = wrapper.emitted('apply');
		expect(appliedValues).toEqual([{ ...stubValues }]);
	});

	// prettier-ignore
	test('Clear filters', async () => {
		expect(CharacterFilter).toBeTruthy();

		const wrapper = mount(CharacterFilter, {
			props: {
				value: {
					...stubValues,
				},
			},
		});

		expect(wrapper.html()).toMatchSnapshot();

		await wrapper
			.find('[data-filter=clear]')
			.trigger('click');

		expect(wrapper.emitted()).toHaveProperty('clear');

		expect(wrapper.html()).toMatchSnapshot();
	});
});

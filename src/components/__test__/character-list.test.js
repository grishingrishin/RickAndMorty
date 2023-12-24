import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import CharacterList from '@/components/CharacterList.vue';

describe('CharacterList', () => {
	const stubCharacter = [
		[
			{
				id: 1,
				picture: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
				name: 'Rick Sanchez',
				status: 'Alive',
				gender: 'Male',
				episodes: ['https://rickandmortyapi.com/api/episode/1'],
			},
			{
				id: 2,
				picture: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
				name: 'Morty Smith',
				status: 'Alive',
				gender: 'Male',
				episodes: ['https://rickandmortyapi.com/api/episode/1'],
			},
			{
				id: 3,
				picture: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
				name: 'Summer Smith',
				status: 'Alive',
				gender: 'Female',
				episodes: ['https://rickandmortyapi.com/api/episode/1'],
			},
		],
	];

	test('Mounted pure component', () => {
		expect(CharacterList).toBeTruthy();

		const wrapper = mount(CharacterList);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Mounted component with character', () => {
		expect(CharacterList).toBeTruthy();

		const wrapper = mount(CharacterList, {
			props: {
				list: stubCharacter,
			},
			shallow: true,
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Mounted component with slot', () => {
		expect(CharacterList).toBeTruthy();

		const wrapper = mount(CharacterList, {
			slots: {
				append: "Hello, i'am slot",
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});

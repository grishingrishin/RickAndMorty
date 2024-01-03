import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import { characterDto } from '@/libs/dto';

import CharacterCard from '@/components/CharacterCard.vue';

describe('CharacterCard', () => {
	const stubCharacter = {
		id: 1,
		picture: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
		name: 'Rick Sanchez',
		status: 'Alive',
		gender: 'Male',
		episode: ['https://rickandmortyapi.com/api/episode/1'],
	};

	test('Mounted component pure component', () => {
		expect(CharacterCard).toBeTruthy();

		const wrapper = mount(CharacterCard);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Mounted component without episodes', () => {
		expect(CharacterCard).toBeTruthy();

		const wrapper = mount(CharacterCard, {
			props: {
				data: characterDto({
					...stubCharacter,
					episode: [],
				}),
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Mounted component with episodes', () => {
		expect(CharacterCard).toBeTruthy();

		const wrapper = mount(CharacterCard, {
			props: {
				data: characterDto(stubCharacter),
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});

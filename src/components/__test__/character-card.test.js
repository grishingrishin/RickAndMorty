import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import { cardDto } from '@/libs/dto';

import CharacterCard from '@/components/CharacterCard.vue';

describe('The character card component', () => {
	test('Mounted component without episodes', () => {
		expect(CharacterCard).toBeTruthy();

		const wrapper = mount(CharacterCard, {
			props: {
				data: cardDto(),
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Mounted component with episodes', () => {
		expect(CharacterCard).toBeTruthy();

		const episode = [
			'https://rickandmortyapi.com/api/episode/1',
			'https://rickandmortyapi.com/api/episode/2',
			'https://rickandmortyapi.com/api/episode/3',
			'https://rickandmortyapi.com/api/episode/4',
			'https://rickandmortyapi.com/api/episode/5',
			'https://rickandmortyapi.com/api/episode/6',
			'https://rickandmortyapi.com/api/episode/7',
		];

		const wrapper = mount(CharacterCard, {
			props: {
				data: cardDto({
					episode,
				}),
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});

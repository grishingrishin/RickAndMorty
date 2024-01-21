<script setup lang="ts">
import { computed } from 'vue';

import type { Character } from '@/libs/types';

type Props = {
	data: Character;
};

const props = withDefaults(defineProps<Props>(), {
	data: () => ({}) as Character,
});

// prettier-ignore
const allEpisodes = computed(() => {
	const {
		data: {
			episode
		}
	} = props;

	if (!Array.isArray(episode)) {
		return '';
	}

	const res = episode
		.map(item => item.replace(/\D/gi, ''))
		.join(',');

	return res;
});
</script>

<template>
	<div class="character-card">
		<div class="character-card__figure">
			<img :src="data.image" :alt="`Name: (${data.name})`" class="character-card__img" />
		</div>
		<div class="character-card__body">
			<div class="character-card__name">
				{{ data.name }}
			</div>
			<div class="character-card__status">
				{{ data.status }}
			</div>
			<template v-if="allEpisodes">
				<div class="character-card__episodes">Episodes: {{ allEpisodes }}</div>
			</template>
		</div>
	</div>
</template>

<style lang="scss">
.character-card {
	display: flex;
	flex-direction: column;
	gap: 14px;
	min-height: 320px;
	padding: 14px;

	&__body {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	&__img {
		width: 100%;
		object-fit: cover;
		aspect-ratio: 1.1;
	}

	&__episodes {
		word-break: break-all;
	}
}
</style>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	data: {
		type: Object,
		default: () => ({}),
	},
});

const episodeNumbers = computed(() =>
	props.data.episodes.map(episode => episode.replace(/\D/gi, '')).join(',')
);
</script>

<template>
	<div class="character-card">
		<div class="character-card__figure">
			<img
				:src="data.picture"
				:alt="`Name: (${data.name})`"
				class="character-card__img"
			/>
		</div>
		<div class="character-card__body">
			<div class="character-card__name">{{ data.name }}</div>
			<div class="character-card__status">{{ data.status }}</div>
			<div class="character-card__episodes">Episodes: {{ episodeNumbers }}</div>
		</div>
	</div>
</template>

<style lang="scss">
.character-card {
	display: flex;
	min-height: 320px;
	gap: 14px;
	flex-direction: column;
	padding: 14px;

	&__body {
		display: flex;
		gap: 6px;
		flex-direction: column;
	}

	&__img {
		width: 100%;
		aspect-ratio: 1.1;
		object-fit: cover;
	}

	&__episodes {
		word-break: break-all;
	}
}
</style>

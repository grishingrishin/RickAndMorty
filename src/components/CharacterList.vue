<script setup>
import CharacterCard from '@/components/CharacterCard.vue';

defineProps({
	characters: {
		type: Array,
		default: () => [],
	},
});
</script>

<template>
	<ul class="character-list">
		<li v-for="character of characters" :key="character.id" class="character-list__item">
			<CharacterCard :data="character" />
		</li>
	</ul>
</template>

<style lang="scss">
.character-list {
	display: grid;
	gap: 14px;
	grid-template-columns: 1fr;

	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
	}

	&__item {
		border: 1px solid #212121;
	}
}
</style>

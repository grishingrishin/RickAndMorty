<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue';

import type { Character } from '@/libs/types';

type Props = {
	list: Array<Character>;
};

withDefaults(defineProps<Props>(), {
	list: () => [] as Array<Character>,
});
</script>

<template>
	<div class="character-list">
		<template v-if="list.length">
			<ul class="character-list__grid">
				<li v-for="(item, idx) of list" :key="idx" class="character-list__cell">
					<CharacterCard :data="item" />
				</li>
			</ul>
		</template>
		<template v-if="$slots.append">
			<div class="character-list__append">
				<slot name="append" />
			</div>
		</template>
	</div>
</template>

<style lang="scss">
.character-list {
	&__grid {
		display: grid;
		gap: 14px;
		grid-template-columns: 1fr;

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	&__cell {
		border: 1px solid #212121;
	}
}
</style>

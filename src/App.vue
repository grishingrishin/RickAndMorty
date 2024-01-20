<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, type Ref } from 'vue';

import { LOCAL_STORAGE_FILTER, API_URL } from '@/utils/constants';
import { formatStr, injectParams } from '@/utils/helpers';
import { characterDto } from '@/libs/dto';
import type { Character, FilterParams } from '@/libs/types';

import ScrollPagination from '@/components/ScrollPagination.vue';
import CharacterFilter from '@/components/CharacterFilter.vue';
import CharacterList from '@/components/CharacterList.vue';

const characters: Ref<Array<Character>> = ref([]);
const filtersApplied: Ref<Partial<FilterParams> | null> = ref(null);
const isFetchingPage = ref(false);
const curPage = ref(1);
const isLastPage = ref(false);

const filteredCharacters = computed(() => {
	if (!filtersApplied.value) {
		return [];
	}

	const hasParam = (
		target: Character,
		params: Partial<FilterParams>,
		key: keyof FilterParams,
	) => formatStr(target[key]) === formatStr(params[key] as string);

	// NEED REFACTORING
	const filtered = characters.value.filter(character =>
		Object.keys(filtersApplied.value as Partial<FilterParams>).every(key =>
			hasParam(
				character,
				filtersApplied.value as Partial<FilterParams>,
				key as keyof FilterParams,
			),
		),
	);

	return filtered;
});

onBeforeMount(restoreFilter);
onMounted(init);

function init() {
	fetchCharacters();
}

function restoreFilter() {
	if (window.localStorage.getItem(LOCAL_STORAGE_FILTER)) {
		filtersApplied.value = JSON.parse(
			window.localStorage.getItem(LOCAL_STORAGE_FILTER) as string,
		);
	}
}

function applyFilter(params: Partial<FilterParams>) {
	window.localStorage.setItem(LOCAL_STORAGE_FILTER, JSON.stringify(params));
	filtersApplied.value = params;
}

function clearFilter() {
	window.localStorage.removeItem(LOCAL_STORAGE_FILTER);
	filtersApplied.value = null;
}

async function fetchCharacters() {
	if (isFetchingPage.value || isLastPage.value) {
		return;
	}

	isFetchingPage.value = true;
	const endpoint = new URL(API_URL);

	injectParams(endpoint, {
		page: curPage.value.toString(),
	});

	const response = await window.fetch(endpoint);
	const data = await response.json();

	if (data.info.next) curPage.value += 1;
	else isLastPage.value = true;

	characters.value = [...characters.value, ...data.results.map(characterDto)];

	isFetchingPage.value = false;
}
</script>

<template>
	<div class="app">
		<ScrollPagination :disabled="isLastPage" @update="fetchCharacters">
			<div class="app__top">
				<CharacterFilter
					:value="filtersApplied"
					@apply="applyFilter"
					@clear="clearFilter"
				/>
			</div>
			<div class="app__body">
				<template v-if="filtersApplied">
					<CharacterList :list="filteredCharacters">
						<template v-if="!filteredCharacters.length" #append>
							Ooops... characters is not't defined
						</template>
					</CharacterList>
				</template>
				<template v-else>
					<CharacterList :list="characters" />
				</template>
			</div>
		</ScrollPagination>
	</div>
</template>

<style lang="scss">
.app {
	max-width: 920px;
	margin: 0 auto;
	padding: 14px;

	&__top {
		margin-bottom: 14px;
	}
}
</style>

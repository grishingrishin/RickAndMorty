<script setup>
import { ref, computed, onBeforeMount, onMounted } from 'vue';

import { LOCAL_STORAGE_FILTER, API_URL } from '@/utils/constants';
import { formatStr, injectParams } from '@/utils/helpers';
import { cardDto } from '@/libs/dto';

import ScrollPagination from '@/components/ScrollPagination.vue';
import CharacterFilter from '@/components/CharacterFilter.vue';
import CharacterList from '@/components/CharacterList.vue';

const characters = ref([]);
const filtersApplied = ref(null);
const isFetchingPage = ref(false);
const curPage = ref(1);
const isLastPage = ref(false);

const filteredCharacters = computed(() => {
	if (!filtersApplied.value) {
		return [];
	}

	const filtered = characters.value.filter(character => {
		return Object.keys(filtersApplied.value).every(key => {
			return formatStr(character[key]) === formatStr(filtersApplied.value[key]);
		});
	});

	return filtered;
});

onBeforeMount(restoreFilter);
onMounted(init);

function init() {
	fetchCharacters();
}

function restoreFilter() {
	if (window.localStorage.getItem(LOCAL_STORAGE_FILTER)) {
		filtersApplied.value = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_FILTER));
	}
}

function applyFilter(params) {
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
		page: curPage.value,
	});

	const response = await window.fetch(endpoint);
	const data = await response.json();

	if (data.info.next) curPage.value += 1;
	else isLastPage.value = true;

	characters.value = [...characters.value, ...data.results.map(cardDto)];

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
					<template v-if="filteredCharacters.length">
						<CharacterList :characters="filteredCharacters" />
					</template>
					<template v-else>
						<div class="app__text">Ooops... characters is not't defined</div>
					</template>
				</template>
				<template v-else>
					<CharacterList :characters="characters" />
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

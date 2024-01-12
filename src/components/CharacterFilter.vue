<script setup lang="ts" generic="T">
import { shallowReactive, computed, watch } from 'vue';

import { filterDto } from '@/libs/dto';
import type { FilterParams } from '@/libs/types';

type FilterValues = Partial<FilterParams>;

type Props = {
	value: T;
};

type Emits = {
	(e: 'apply', value: FilterValues): void;
	(e: 'clear'): void;
};

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const values = shallowReactive<FilterParams>(init());

const isActive = computed(() =>
	Object.keys(values).some(key => values[key as keyof FilterParams])
);

// prettier-ignore
const isAutoClear = computed(() =>
	!isActive.value && !!props.value
);

watch(isAutoClear, newVal => {
	if (newVal) {
		reset();
	}
});

function init() {
	return filterDto(Object(props.value));
}

function apply() {
	const preparedValues = prepare(values);
	emit('apply', preparedValues);
}

function prepare(params: FilterParams): FilterValues {
	return Object.keys(params).reduce<FilterValues>((acc, key) => {
		const curParam = key as keyof FilterParams;

		if (params[curParam]) {
			acc[curParam] = params[curParam];
		}

		return acc;
	}, {});
}

function reset() {
	clear();
	emit('clear');
}

function clear() {
	const defParams = filterDto();

	Object.keys(defParams).forEach(key => {
		const curParam = key as keyof FilterParams;

		if (Object.hasOwn(values, curParam)) {
			values[curParam] = defParams[curParam];
		}
	});
}
</script>

<template>
	<div class="character-filter">
		<div class="character-filter__filter">
			<select
				v-model="values.status"
				class="character-filter__select"
				data-filter="status"
			>
				<option value="">status</option>
				<option value="alive">alive</option>
				<option value="dead">dead</option>
				<option value="unknown">unknown</option>
			</select>
		</div>
		<div class="character-filter__filter">
			<select
				v-model="values.gender"
				class="character-filter__select"
				data-filter="gender"
			>
				<option value="">gender</option>
				<option value="female">female</option>
				<option value="male">male</option>
				<option value="genderless">genderless</option>
				<option value="unknown">unknown</option>
			</select>
		</div>
		<template v-if="isActive">
			<div class="character-filter__actions">
				<div class="character-filter__action">
					<button
						type="button"
						class="character-filter__btn"
						data-filter="apply"
						@click="apply"
					>
						apply
					</button>
				</div>
				<div class="character-filter__action">
					<button
						type="button"
						class="character-filter__btn"
						data-filter="clear"
						@click="reset"
					>
						clear
					</button>
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss">
.character-filter {
	display: flex;
	gap: 14px;
	align-items: center;

	&__actions {
		display: flex;
		gap: 14px;
		margin-left: auto;
	}
}
</style>

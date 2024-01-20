<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { throttle } from '@/utils/helpers';

type Props = {
	disabled: boolean;
}

type Emits = {
	(e: 'update'): void;
};

const GLOBAL_EVENTS = [
	{
		name: 'scroll',
		handler: throttle(onScroll),
	},
	{
		name: 'resize',
		handler: throttle(onScroll),
	},
	{
		name: 'wheel',
		handler: throttle(onWheel),
	},
];

const THRESHOLD_PART = 4;

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

onMounted(addEventListeners);
onUnmounted(removeEventListeners);

function addEventListeners() {
	if (props.disabled) {
		return;
	}

	GLOBAL_EVENTS.forEach(evt => {
		window.addEventListener(evt.name, evt.handler);
	});
}

function removeEventListeners() {
	if (props.disabled) {
		return;
	}

	GLOBAL_EVENTS.forEach(evt => {
		window.removeEventListener(evt.name, evt.handler);
	});
}

function onScroll() {
	const scrollHeight = document.documentElement.scrollHeight;
	const screenHeight = window.innerHeight;
	const scrolled = window.scrollY;

	const threshold = scrollHeight - screenHeight / THRESHOLD_PART;
	const position = scrolled + screenHeight;

	if (position >= threshold) {
		emit('update');
	}
}

function onWheel() {
	const scrollHeight = document.documentElement.scrollHeight;
	const screenHeight = window.innerHeight;
	const scrolled = window.scrollY;

	const threshold = scrollHeight - screenHeight;

	if (scrolled >= threshold) {
		emit('update');
	}
}
</script>

<template>
	<slot />
</template>

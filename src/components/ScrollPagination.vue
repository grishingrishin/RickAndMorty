<script setup>
import { defineEmits, defineProps, onMounted, onUnmounted } from 'vue';

import { throttle } from '@/utils/helpers';

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

const props = defineProps({
	disabled: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update']);

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
	const height = document.body.offsetHeight;
	const screenHeight = window.innerHeight;

	const scrolled = window.scrollY;

	const threshold = height - screenHeight / THRESHOLD_PART;
	const position = scrolled + screenHeight;

	if (position >= threshold) {
		emit('update');
	}
}

function onWheel() {
	const scrollHeight = document.body.scrollHeight;
	const screenHeight = window.innerHeight;

	if (screenHeight >= scrollHeight) {
		emit('update');
	}
}
</script>

<template>
	<slot />
</template>

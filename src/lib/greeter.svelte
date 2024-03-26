<script lang="ts">
	import { onMount } from 'svelte';
	import type { HomeLayout } from './types/home-layout';
	import Icon from './icon.svelte';
	import Calendar from './calendar.svelte';
	export let data: Pick<HomeLayout, 'name' | 'greetingHours'>;

	let now = new Date();

	const defaultGreeting = { greeting: 'Hi there, ', emoji: '👋', hours: [0, 23] };
	const timeHours = now.getHours();
	const greeting =
		data.greetingHours.find(({ hours: [min, max] }) => timeHours >= min && timeHours < max) ??
		defaultGreeting;

	setInterval(() => (now = new Date()), 60000);
</script>

<div class="flex justify-between items-center w-full px-12 mb-8">
	<h1 class="text-4xl">{greeting.greeting} {data.name} {greeting.emoji ?? ''}</h1>
	<Calendar date={now} />
</div>

<style>
	.show-on-hover {
		display: inline-block;
		max-width: 0px;
		opacity: 0;
		overflow: visible;
		white-space: pre;
		transition: 150ms;
	}

	*:hover .show-on-hover {
		max-width: 200px;
		opacity: 1;
	}
</style>

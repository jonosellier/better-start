<script lang="ts">
	import type { HomeLayout } from './types/home-layout';
	import Calendar from './calendar.svelte';
	import StockTicker from './stock-ticker.svelte';
	export let data: Pick<HomeLayout, 'name' | 'greetingHours' | 'calendarLink' | 'ticker'>;

	let now = new Date();

	const defaultGreeting = { greeting: 'Hi there, ', emoji: '👋', hours: [0, 23] };
	const timeHours = now.getHours();
	const greeting =
		data.greetingHours.find(({ hours: [min, max] }) => timeHours >= min && timeHours < max) ??
		defaultGreeting;

	setInterval(() => (now = new Date()), 60000);
</script>

<div class="flex justify-between items-center w-full px-12 mb-8 gap-6">
	<h1 class="text-4xl grow">{greeting.greeting} {data.name} {greeting.emoji ?? ''}</h1>
	<StockTicker ticker={data.ticker} />
	<Calendar date={now} calendarLink={data.calendarLink} />
</div>

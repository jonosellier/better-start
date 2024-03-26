<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './icon.svelte';

	export let date: Date;

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec'
	];

	onMount(() => {
		if (!date) {
			date = new Date();
		}
		setInterval(() => (date = new Date()), 60000);
	});
</script>

<div class="flex items-center main-container">
	<div
		class="details-chip bg-white/10 text-white px-3 py-1 rounded-full text-lg overflow-hidden duration-150 me-2 text-sm"
	>
		<span class="inline-block"
			>{date.toLocaleDateString('en-US', {
				dateStyle: 'full'
			})} at {date.toLocaleTimeString('en-US', {
				timeStyle: 'short'
			})}</span
		>
	</div>
	<div class="relative text-zinc-400 cal-holder">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			class="bi bi-calendar-fill fill-zinc-100"
			viewBox="0 0 16 16"
		>
			<path
				d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5"
			/>
		</svg>
		<div class="absolute bg-red-700 text-zinc-100 w-full text-center uppercase month-holder">
			{months[date?.getMonth()]}
		</div>
		<div class="absolute w-full bottom-0 text-center text-zinc-900 text-3xl">
			<strong>{date?.getDate()}</strong>
		</div>
	</div>
</div>

<style>
	.cal-holder,
	.bi-calendar-fill {
		width: 46px;
		height: 46px;
	}
	.month-holder {
		top: 3px;
		font-size: 10px;
		font-weight: bold;
		letter-spacing: 1px;
		line-height: 12px;
		border-radius: 4px 4px 0 0;
	}

	.main-container:not(:hover) .details-chip {
		transform: translateX(32px);
		opacity: 0;
	}
</style>

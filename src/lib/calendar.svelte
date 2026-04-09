<script lang="ts">
	import { onMount } from 'svelte';

	export let date: Date;

	export let calendarLink: string | undefined;

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

<a
	class="flex items-center main-container text-zinc-700 dark:text-zinc-900 drop-shadow"
	href={calendarLink}
>
	<div class="relative text-zinc-100 dark:text-zinc-400 cal-holder cursor-pointer">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			class="bi bi-calendar-fill fill-zinc-700 dark:fill-zinc-100"
			viewBox="0 0 16 16"
		>
			<path
				d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5"
			/>
		</svg>

		<div
			class="absolute rounded border border-slate-300 w-full bottom-0 text-center bg-white dark:bg-zinc-200 text-zinc-700 dark:text-zinc-900 text-3xl"
		>
			<strong>{date?.getDate()}</strong>
		</div>
		<div
			class="absolute bg-red-600 text-zinc-50 dark:bg-red-700 dark:text-zinc-100 w-full text-center uppercase month-holder"
		>
			{months[date?.getMonth()]}
		</div>
	</div>
</a>

<style>
	.cal-holder,
	.bi-calendar-fill {
		width: 46px;
		height: 46px;
	}
	.month-holder {
		top: 2px;
		font-size: 10px;
		font-weight: bold;
		letter-spacing: 1px;
		line-height: 12px;
		border-radius: 4px 4px 0 0;
	}
</style>

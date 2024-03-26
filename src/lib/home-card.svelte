<script lang="ts">
	import type { HomeCard } from './types/home-layout';

	export let card: HomeCard;
</script>

<div class="py-6 rounded-xl bg-zinc-800 border border-zinc-400/20">
	<div class="px-6 flex items-center justify-between mb-5">
		<h1 class="text-xl font-bold">{card.title}</h1>
		<span class="text-3xl">{card.icon}</span>
	</div>
	<div class="px-3">
		{#each card.links as link, i}
			{#if i > 0}
				<hr class="opacity-20" />
			{/if}
			<a href={link.href} class="btn w-full">{link.text}</a>
		{/each}
	</div>
</div>

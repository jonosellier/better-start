<script lang="ts">
	import type { HomeCard } from './types/home-layout';

	export let card: HomeCard;

	const EMOJI_REGEX =
		/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
</script>

<div class="py-6 rounded-xl bg-zinc-800 border border-zinc-400/20 min-w-64">
	<div class="px-6 flex items-center justify-between mb-5">
		<h1 class="text-xl font-bold">{card.title}</h1>
		{#if card.icon.match(EMOJI_REGEX)}
			<span class="text-3xl">{card.icon}</span>
		{:else}
			<img src={card.icon} alt={card.title} class="w-9 h-9 object-contain" />
		{/if}
	</div>
	<div class="px-3">
		{#each card.links as link, i}
			{#if i > 0}
				<hr class="border-zinc-600 mx-2" />
			{/if}
			<a href={link.href} class="btn w-full">{link.text}</a>
		{/each}
	</div>
</div>

<style>
	hr {
		margin-top: -1px;
		margin-bottom: -1px;
	}
</style>

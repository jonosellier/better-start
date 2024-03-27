<script>
	import Icon from '$lib/icon.svelte';
	import '../app.css';
	import { page } from '$app/stores';

	import { data } from '$lib/data';
	import HomeCard from '$lib/home-card.svelte';
	import Greeter from '$lib/greeter.svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { initStorageStore, storageStore } from '$lib/stores/storage';

	let loaded = false;

	$: isHome = $page.url.pathname === base+'/';

	onMount(() => {
		initStorageStore();
		loaded = true;
	});
</script>

{#if $storageStore}
	<div class="text-white bg-zinc-900">
		<div class="flex flex-col items-center justify-center h-dvh max-w-6xl mx-auto px-4">
			<Greeter data={$storageStore} />
			<hr class="my-8 border border-zinc-700 w-full">
			<main class="grid grid-cols-4 gap-4 p-7 w-full">
				{#each $storageStore.cards as card}
					<HomeCard {card} />
				{/each}
			</main>
		</div>
	</div>
{/if}
<div class="w-full fixed text-end z-50 text-white top-0 p-5">
	<a class="btn-icon" href={`${base}/edit`}>
		<Icon symbol="bi-three-dots-vertical" />
	</a>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="text-white bg-black/40 backdrop-blur-lg w-full h-dvh fixed flex items-start justify-center top-0 py-14 duration-500"
	class:closed={isHome}
	on:click={() => goto(`${base}/`)}
>
	{#if loaded && !isHome}
		<div class="max-w-3xl duration-300 p-5 max-h-full">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<aside
				class="p-5 rounded-xl bg-zinc-800 border border-zinc-400/20 relative"
				on:click={(e) => {
					e.stopImmediatePropagation();
				}}
			>
				<a class="btn-icon absolute end-0 top-0 m-5" href={`${base}/`}>
					<Icon symbol="bi-x-lg" />
				</a>
				<slot />
			</aside>
		</div>
	{/if}
</div>

<style>
	.closed {
		opacity: 0;
		pointer-events: none;
	}
</style>

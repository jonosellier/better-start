<script lang="ts">
	import { colorPaletteStore, type ColorPalette } from '$lib/stores/theme';
	import Icon from '$lib/icon.svelte';

	const palettes: { name: ColorPalette; emoji: string }[] = [
		{ name: 'blue', emoji: '🔵' },
		{ name: 'pink', emoji: '💗' },
		{ name: 'violet', emoji: '🟣' },
		{ name: 'lime', emoji: '🟢' },
		{ name: 'orange', emoji: '🟠' }
	];

	let isOpen = false;
</script>

<div class="relative">
	<button on:click={() => (isOpen = !isOpen)} class="btn-icon" title="Change color palette">
		<Icon symbol="bi-palette" />
	</button>

	{#if isOpen}
		<div
			class="absolute top-12 right-0 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-lg p-2 flex gap-2 z-50"
		>
			{#each palettes as { name, emoji }}
				<button
					on:click={() => {
						colorPaletteStore.set(name);
						isOpen = false;
					}}
					class="w-8 h-8 rounded-full hover:scale-110 transition-transform"
					class:ring-2={$colorPaletteStore === name}
					class:ring-offset-2={$colorPaletteStore === name}
					class:ring-zinc-400={$colorPaletteStore === name}
					class:dark:ring-zinc-600={$colorPaletteStore === name}
					title={name.charAt(0).toUpperCase() + name.slice(1)}
				>
					{emoji}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	:global(.ring-offset-2) {
		--tw-ring-offset-width: 2px;
		--tw-ring-offset-color: rgb(255 255 255 / 1);
	}

	:global(.dark .ring-offset-2) {
		--tw-ring-offset-color: rgb(39 39 42 / 1);
	}
</style>

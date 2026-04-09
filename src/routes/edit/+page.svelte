<script lang="ts">
	import { storageStore } from '$lib/stores/storage';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import EditCard from '$lib/edit-card.svelte';
	import EditCommand from '$lib/edit-command.svelte';
	import { HomeCard, type DynamicCommand } from '$lib/types/home-layout';
	import Icon from '$lib/icon.svelte';
	import { themeStore } from '$lib/stores/theme';
	import ColorPalettePicker from '$lib/color-palette-picker.svelte';

	let name = $storageStore?.name ?? '';
	let cols = $storageStore?.cols ?? 4;
	let ticker = $storageStore?.ticker;

	function handleSave() {
		if ($storageStore) {
			$storageStore.name = name;
			$storageStore.cols = cols;
			$storageStore.ticker = ticker;
			storageStore.set($storageStore);
		}
		goto(`${base}/`);
	}

	function addCard() {
		if ($storageStore) {
			$storageStore.cards = [...$storageStore.cards, new HomeCard()];
		}
	}

	function removeCard(index: number) {
		if ($storageStore) {
			$storageStore.cards = $storageStore.cards.filter((_, i) => i !== index);
		}
	}

	function addCommand() {
		if ($storageStore) {
			const newCommand: DynamicCommand = {
				name: 'cmd',
				tag: 'Display Name',
				replacer: 'https://www.example.com/$1/$2'
			};
			const store = $storageStore;
			$storageStore.commands = [...store.commands, newCommand];
		}
	}

	function removeCommand(index: number) {
		if ($storageStore) {
			$storageStore.commands = $storageStore.commands.filter((_, i) => i !== index);
		}
	}
</script>

<div class="flex me-20 justify-between items-start">
	<h1 class="text-2xl pb-5 font-bold">Edit Settings</h1>

	<div class="flex gap-2 items-center">
		<ColorPalettePicker />
		<button on:click={() => themeStore.toggle()} class="btn-icon" title="Toggle theme">
			<Icon symbol={$themeStore === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'} />
		</button>
		<button
			on:click={handleSave}
			class="px-6 py-2 text-white rounded-lg font-medium transition-colors"
			style="background-color: var(--color-600);"
			on:mouseenter={(e) => (e.target.style.backgroundColor = 'var(--color-700)')}
			on:mouseleave={(e) => (e.target.style.backgroundColor = 'var(--color-600)')}
		>
			Save
		</button>
	</div>
</div>

<div class="flex gap-6">
	<!-- Name Input -->
	<div class="w-xl">
		<label for="name" class="block text-sm font-medium mb-2">Your Name</label>
		<input
			id="name"
			type="text"
			bind:value={name}
			placeholder="Enter your name"
			class="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
		/>
	</div>

	<!-- Columns Input -->
	<div>
		<label for="cols" class="block text-sm font-medium mb-2">Grid Columns</label>
		<input
			id="cols"
			type="number"
			bind:value={cols}
			min="1"
			max="12"
			class="w-22 px-4 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
		/>
	</div>

	<div class="w-72">
		<label for="ticker" class="block text-sm font-medium mb-2"
			>Ticker in MARKET:SYMBOL format <em class="text-zinc-600 dark:text-zinc-400 font-normal"
				>(optional)</em
			></label
		>
		<input
			id="ticker"
			type="text"
			bind:value={ticker}
			placeholder="e.g. NASDAQ:SPY"
			class="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 invalid:border-red-500"
			pattern="\w+:\w+"
		/>
		<a
			href="https://www.tradingview.com/widget-docs/markets/"
			target="_blank"
			class="text-sm text-zinc-600 dark:text-zinc-300 underline hover-color-link"
			>Available Markets and Tickers</a
		>
	</div>

	<!-- Actions -->
</div>

<!-- Cards Section -->
<div class="mt-8">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-xl font-bold">Edit Cards</h2>
		<button
			on:click={addCard}
			class="px-4 py-2 text-white rounded-lg font-medium transition-colors"
			style="background-color: var(--color-600);"
			on:mouseenter={(e) => (e.target.style.backgroundColor = 'var(--color-700)')}
			on:mouseleave={(e) => (e.target.style.backgroundColor = 'var(--color-600)')}
		>
			+ Add Card
		</button>
	</div>

	{#if $storageStore?.cards && $storageStore.cards.length > 0}
		<div class="grid gap-4" style:grid-template-columns={`repeat(${cols}, minmax(0, 1fr))`}>
			{#each $storageStore.cards as card, index (index)}
				<div class="relative">
					<EditCard {card} />
					<button
						on:click={() => removeCard(index)}
						class="absolute top-2 right-2 w-6 h-6 bg-transparent hover:bg-red-500 dark:hover:bg-red-600 text-zinc-900 dark:text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
						title="Delete card"
					>
						<Icon symbol="bi-x-lg" size="sm" />
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div
			class="p-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 rounded-lg"
		>
			No cards yet. Click "+ Add Card" to create one.
		</div>
	{/if}
</div>

<!-- Commands Section -->
<div class="mt-8">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-xl font-bold">Edit Dynamic Commands</h2>
		<button
			on:click={addCommand}
			class="px-4 py-2 text-white rounded-lg font-medium transition-colors"
			style="background-color: var(--color-600);"
			on:mouseenter={(e) => (e.target.style.backgroundColor = 'var(--color-700)')}
			on:mouseleave={(e) => (e.target.style.backgroundColor = 'var(--color-600)')}
		>
			+ Add Command
		</button>
	</div>

	{#if $storageStore?.commands && $storageStore.commands.length > 0}
		<div class="space-y-4">
			{#each $storageStore.commands as command, index (index)}
				<div class="relative">
					<EditCommand {command} />
					<button
						on:click={() => removeCommand(index)}
						class="absolute top-2 right-2 w-6 h-6 bg-transparent hover:bg-red-500 dark:hover:bg-red-600 text-zinc-900 dark:text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
						title="Delete command"
					>
						<Icon symbol="bi-x-lg" size="sm" />
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div
			class="p-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 rounded-lg"
		>
			No commands yet. Click "+ Add Command" to create one.
		</div>
	{/if}
</div>

<style>
	:global(.hover-color-link:hover) {
		color: var(--color-600) !important;
	}

	:global(.dark .hover-color-link:hover) {
		color: var(--color-400) !important;
	}
</style>

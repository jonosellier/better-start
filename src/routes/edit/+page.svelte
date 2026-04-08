<script lang="ts">
	import { storageStore } from '$lib/stores/storage';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import EditCard from '$lib/edit-card.svelte';
	import EditCommand from '$lib/edit-command.svelte';
	import { HomeCard, type DynamicCommand } from '$lib/types/home-layout';
	import Icon from '$lib/icon.svelte';

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

	<button
		on:click={handleSave}
		class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
	>
		Save
	</button>
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
			class="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
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
			class="w-22 px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-zinc-500"
		/>
	</div>

	<div class="w-72">
		<label for="ticker" class="block text-sm font-medium mb-2"
			>Ticker in MARKET:SYMBOL format <em class="text-zinc-400 font-normal">(optional)</em></label
		>
		<input
			id="ticker"
			type="text"
			bind:value={ticker}
			placeholder="e.g. NASDAQ:SPY"
			class="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 invalid:border-red-500"
			pattern="\w+:\w+"
		/>
		<a
			href="https://www.tradingview.com/widget-docs/markets/"
			target="_blank"
			class="text-sm text-zinc-300 hover:text-blue-400 underline">Available Markets and Tickers</a
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
			class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
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
						class="absolute top-2 right-2 w-6 h-6 bg-transparent hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
						title="Delete card"
					>
						<Icon symbol="bi-x-lg" size="sm" />
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="p-4 text-center text-zinc-400 border border-zinc-600 rounded-lg">
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
			class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
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
						class="absolute top-2 right-2 w-6 h-6 bg-transparent hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
						title="Delete command"
					>
						<Icon symbol="bi-x-lg" size="sm" />
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="p-4 text-center text-zinc-400 border border-zinc-600 rounded-lg">
			No commands yet. Click "+ Add Command" to create one.
		</div>
	{/if}
</div>

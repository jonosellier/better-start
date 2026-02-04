<script lang="ts">
	import { storageStore } from '$lib/stores/storage';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import EditCard from '$lib/edit-card.svelte';
	import { HomeCard } from '$lib/types/home-layout';

	let name = $storageStore?.name ?? '';
	let cols = $storageStore?.cols ?? 4;

	function handleSave() {
		if ($storageStore) {
			$storageStore.name = name;
			$storageStore.cols = cols;
			storageStore.set($storageStore);
		}
		goto(`${base}/`);
	}

	function handleCancel() {
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
		<div class="flex items-center gap-4">
			<input
				id="cols"
				type="number"
				bind:value={cols}
				min="1"
				max="12"
				class="w-20 px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-zinc-500"
			/>
			<span class="text-sm text-zinc-400">
				Cards will be arranged in a {cols}-column grid
			</span>
		</div>
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
						class="absolute top-2 right-2 w-6 h-6 bg-red-700 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
						title="Delete card"
					>
						×
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

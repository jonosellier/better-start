<script lang="ts">
	import { page } from '$app/stores';
	import { storageStore } from '$lib/stores/storage';
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	const commands: { name: string; tag: string; command: () => void }[] = [];

	onMount(() => {
		$storageStore.cards.forEach((c) => {
			c.links.forEach((l) => {
				commands.push({
					name: `${c.title}: ${l.text}`,
					tag: 'link',
					command: () => (window.location.href = new URL(l.href).toString())
				});
			});
		});

		fuse = new Fuse(commands, {
			keys: ['name'],
			includeMatches: true
		});

		window.addEventListener('keydown', (e) => {
			if (e.key === '/' && $page.url.pathname === base + '/') {
				show = true;
				inputEl.focus();
				e.preventDefault();
				e.stopPropagation();
			}
			if (e.key === 'Escape') {
				show = false;
				inputEl.blur();
				inputEl.value = '';
			}
		});
	});

	let fuse = new Fuse(commands, {
		keys: ['name']
	});

	let results: {
		name: string;
		tag: string;
		command: () => void;
		highlightedName: string;
	}[] = [];

	let show = false;

	let inputEl: HTMLInputElement;

	let selectedIndex = -1;

	function search(e: Event) {
		const searchResults = fuse.search((e.target as HTMLInputElement).value);
		results = searchResults.map((v) => {
			const { item, matches } = v;
			// make the matched parts of the name wrapped in a span.match element
			let highlightedName = item.name;

			if (matches) {
				const nameMatches = matches.find((m) => m.key === 'name');
				if (nameMatches?.indices && nameMatches.indices.length > 0) {
					// Sort indices in reverse to maintain string positions when inserting HTML
					const indices = [...nameMatches.indices].sort((a, b) => b[0] - a[0]);

					indices.forEach(([start, end]) => {
						highlightedName =
							highlightedName.slice(0, start) +
							`<span class="match">${highlightedName.slice(start, end + 1)}</span>` +
							highlightedName.slice(end + 1);
					});
				}
			}

			return { ...item, highlightedName };
		});
		selectedIndex = results.length > 0 ? 0 : -1;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (results.length > 0) {
				selectedIndex = (selectedIndex + 1) % results.length;
				const target = selectedIndex === 0 ? 1 : selectedIndex + 2;
				document
					.querySelector(`#search-res > button:nth-child(${target})`)
					?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (results.length > 0) {
				selectedIndex = (selectedIndex - 1 + results.length) % results.length;

				const target = selectedIndex === results.length - 1 ? results.length : selectedIndex;
				document
					.querySelector(`#search-res > button:nth-child(${target})`)
					?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
			}
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (selectedIndex >= 0 && selectedIndex < results.length) {
				results[selectedIndex].command();
			}
		}
	}
</script>

<div
	class="command-palette w-full h-dvh bg-black/40 backdrop-blur-lg fixed flex items-start justify-center top-0 left-0"
	class:show
>
	<div
		class="search-container my-24 w-4/12 bg-zinc-700 border border-zinc-600 rounded-lg focus:border-zinc-500"
	>
		<input
			type="text"
			on:input={search}
			on:keydown={handleKeydown}
			class=" bg-zinc-700 text-white text-4xl placeholder-zinc-400 p-4 w-full focus:outline-none"
			bind:this={inputEl}
		/>
		{#if results.length > 0}
			<div
				class="results flex flex-col text-white p-1 border-zinc-600 border-t max-h-96 overflow-y-auto overflow-x-hidden"
				id="search-res"
			>
				{#each results as res, index}
					<button
						on:click={() => res.command()}
						class="flex-shrink-0 text-lg block text-left py-1 px-2 cursor-pointer transition-all duration-150 whitespace-nowrap overflow-hidden text-ellipsis border rounded {selectedIndex ===
						index
							? 'bg-blue-800 text-blue-200 border-blue-700'
							: 'bg-zinc-700 border-zinc-700'} hover:bg-blue-800 hover:border-blue-700 hover:text-blue-200"
						class:selected-result={selectedIndex === index}
					>
						{@html res.highlightedName}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.results button:not(.selected-result, :hover) {
		@apply text-slate-400;
	}

	:global(.results button.selected-result .match),
	:global(.results button:hover .match) {
		@apply text-white font-semibold;
	}

	:global(.results button:not(.selected-result, :hover) .match) {
		@apply text-slate-300 font-semibold;
	}

	input {
		line-height: 1.5 !important;
	}

	.results {
		scrollbar-width: thin;
		scrollbar-color: #80808080 transparent;
	}

	.command-palette {
		transition: 0.25s ease-in-out;
	}

	.command-palette .search-container {
		transition: 0.25s ease-in-out;
	}

	.command-palette:not(.show) {
		opacity: 0;
		pointer-events: none;
	}

	.command-palette:not(.show) .search-container {
		transform: translateY(-20vh);
	}
</style>

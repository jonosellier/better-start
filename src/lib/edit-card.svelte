<script lang="ts">
	import type { HomeCard } from '$lib/types/home-layout';
	import Icon from './icon.svelte';

	export let card: HomeCard;

	let editingLinkIndex: number | null = null;
	let editingLinkText = '';
	let editingLinkHref = '';

	const EMOJI_REGEX =
		/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

	function startEditLink(index: number) {
		editingLinkIndex = index;
		editingLinkText = card.links[index].text;
		editingLinkHref = card.links[index].href;
	}

	function saveLink() {
		if (editingLinkIndex !== null) {
			card.links[editingLinkIndex] = {
				text: editingLinkText,
				href: editingLinkHref
			};
			card = card;
			cancelEditLink();
		}
	}

	function cancelEditLink() {
		editingLinkIndex = null;
		editingLinkText = '';
		editingLinkHref = '';
	}

	function addLink() {
		card.links = [...card.links, { text: 'New Link', href: 'https://example.com' }];
	}

	function removeLink(index: number) {
		card.links = card.links.filter((_, i) => i !== index);
	}
</script>

<div
	class="space-y-4 p-4 bg-zinc-200 text-zinc-900 dark:bg-zinc-700/50 dark:text-white rounded-lg border border-zinc-300 dark:border-zinc-600"
>
	<!-- Title Input -->
	<div>
		<span class="block text-sm font-medium mb-1">Card Title</span>
		<input
			type="text"
			bind:value={card.title}
			placeholder="Enter card title"
			class="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
		/>
	</div>

	<!-- Icon Input -->
	<div>
		<span class="block text-sm font-medium mb-1">Icon (emoji or image URL)</span>
		<div class="flex gap-2">
			<input
				type="text"
				bind:value={card.icon}
				placeholder="🚀 or https://example.com/icon.png"
				class="flex-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
			/>
			<div
				class="flex items-center justify-center w-12 h-10 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg"
			>
				{#if card.icon.match(EMOJI_REGEX)}
					<span class="text-2xl">{card.icon}</span>
				{:else}
					<img src={card.icon} alt="icon preview" class="w-6 h-6 object-contain" />
				{/if}
			</div>
		</div>
	</div>

	<!-- Links Section -->
	<div>
		<div class="flex items-center justify-between mb-2">
			<span class="text-sm font-medium">Links</span>
		</div>

		<div class="space-y-2">
			{#each card.links as link, index (index)}
				{#if editingLinkIndex === index}
					<!-- Edit Mode -->
					<div
						class="p-3 bg-zinc-300 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-500 rounded-lg space-y-2"
					>
						<input
							type="text"
							bind:value={editingLinkText}
							placeholder="Link text"
							class="w-full px-2 py-1 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
						/>
						<input
							type="url"
							bind:value={editingLinkHref}
							placeholder="https://example.com"
							class="w-full px-2 py-1 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
						/>
						<div class="flex gap-2 justify-end">
							<button
								on:click={cancelEditLink}
								class="px-2 py-1 text-xs bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-500 dark:hover:bg-zinc-500 text-white rounded transition-colors"
							>
								Cancel
							</button>
							<button
								on:click={saveLink}
								class="px-2 py-1 text-xs text-white rounded transition-colors btn-primary"
							>
								Save
							</button>
						</div>
					</div>
				{:else}
					<!-- Display Mode -->
					<div
						class="flex items-center justify-between p-2 bg-zinc-300 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600 rounded-lg"
					>
						<div class="link-txt">
							<div class="text-sm font-medium text-zinc-900 dark:text-white truncate">
								{link.text}
							</div>
							<div class="text-xs text-zinc-600 dark:text-zinc-400 truncate">{link.href}</div>
						</div>
						<div class="flex gap-1">
							<button
								on:click={() => startEditLink(index)}
								class="w-6 h-6 bg-transparent hover:bg-zinc-400 dark:hover:bg-zinc-600 text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
							>
								<Icon symbol="bi-pencil-fill" size="sm" />
							</button>
							<button
								on:click={() => removeLink(index)}
								class="w-6 h-6 bg-transparent hover:bg-red-500 dark:hover:bg-red-600 text-zinc-600 dark:text-zinc-500 dark:hover:text-white hover:text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
							>
								<Icon symbol="bi-trash-fill" size="sm" />
							</button>
						</div>
					</div>
				{/if}
			{/each}

			<button
				on:click={addLink}
				class="text-xs w-full px-2 py-1 bg-zinc-300 dark:bg-zinc-700 btn-muted text-zinc-900 dark:text-white rounded transition-colors hover:text-white btn-muted"
			>
				+ Add Link
			</button>
		</div>
	</div>
</div>

<style>
	.link-txt {
		max-width: calc(100% - 60px);
	}
</style>

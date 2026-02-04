<script lang="ts">
	import type { HomeCard, HomeLink } from '$lib/types/home-layout';

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

<div class="space-y-4 p-4 bg-zinc-700/50 rounded-lg border border-zinc-600">
	<!-- Title Input -->
	<div>
		<label class="block text-sm font-medium mb-1">Card Title</label>
		<input
			type="text"
			bind:value={card.title}
			placeholder="Enter card title"
			class="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
		/>
	</div>

	<!-- Icon Input -->
	<div>
		<label class="block text-sm font-medium mb-1">Icon (emoji or image URL)</label>
		<div class="flex gap-2">
			<input
				type="text"
				bind:value={card.icon}
				placeholder="🚀 or https://example.com/icon.png"
				class="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
			/>
			<div
				class="flex items-center justify-center w-12 h-10 bg-zinc-800 border border-zinc-600 rounded-lg"
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
			<label class="text-sm font-medium">Links</label>
			<button
				on:click={addLink}
				class="text-xs px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
			>
				+ Add Link
			</button>
		</div>

		<div class="space-y-2">
			{#each card.links as link, index (index)}
				{#if editingLinkIndex === index}
					<!-- Edit Mode -->
					<div class="p-3 bg-zinc-800 border border-zinc-500 rounded-lg space-y-2">
						<input
							type="text"
							bind:value={editingLinkText}
							placeholder="Link text"
							class="w-full px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-white text-sm focus:outline-none focus:border-zinc-500"
						/>
						<input
							type="url"
							bind:value={editingLinkHref}
							placeholder="https://example.com"
							class="w-full px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-white text-sm focus:outline-none focus:border-zinc-500"
						/>
						<div class="flex gap-2 justify-end">
							<button
								on:click={cancelEditLink}
								class="px-2 py-1 text-xs bg-zinc-600 hover:bg-zinc-500 text-white rounded transition-colors"
							>
								Cancel
							</button>
							<button
								on:click={saveLink}
								class="px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
							>
								Save
							</button>
						</div>
					</div>
				{:else}
					<!-- Display Mode -->
					<div
						class="flex items-center justify-between p-2 bg-zinc-800 border border-zinc-600 rounded-lg"
					>
						<div>
							<div class="text-sm font-medium text-white">{link.text}</div>
							<div class="text-xs text-zinc-400 truncate">{link.href}</div>
						</div>
						<div class="flex gap-1">
							<button
								on:click={() => startEditLink(index)}
								class="px-2 py-1 text-xs bg-zinc-600 hover:bg-zinc-500 text-white rounded transition-colors"
							>
								Edit
							</button>
							<button
								on:click={() => removeLink(index)}
								class="px-2 py-1 text-xs bg-red-700 hover:bg-red-600 text-white rounded transition-colors"
							>
								Delete
							</button>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

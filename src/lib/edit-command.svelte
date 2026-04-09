<script lang="ts">
	import type { DynamicCommand } from '$lib/types/home-layout';

	export let command: DynamicCommand;
</script>

<div
	class="space-y-3 p-4 bg-zinc-200 text-zinc-900 dark:bg-zinc-700/50 dark:text-white rounded-lg border border-zinc-300 dark:border-zinc-600"
>
	<div class="flex gap-6">
		<!-- Name Input -->
		<div>
			<span class="block text-sm font-medium mb-1">Command</span>
			<input
				type="text"
				bind:value={command.name}
				placeholder="e.g. CMD"
				class="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
			/>
			<div class="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
				This is the command you enter in the command palette
			</div>
		</div>

		<!-- Tag Input -->
		<div>
			<span class="block text-sm font-medium mb-1">Display Name</span>
			<input
				type="text"
				bind:value={command.tag}
				placeholder="e.g. My Command"
				class="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
			/>
			<div class="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
				This is the placeholder text that will be replaced in content.
			</div>
		</div>

		<!-- Replacer Input -->
		<div>
			<span class="block text-sm font-medium mb-1">Replacer (value or URL)</span>
			<input
				type="text"
				bind:value={command.replacer}
				placeholder="e.g. https://issuetracker.com/issues?project=$1&issue=$2"
				class="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
			/>
			<div class="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
				Dynamicly generated URL from the list of arguments. $1 is the first arg, $2 the second, etc.
			</div>
		</div>
	</div>
</div>

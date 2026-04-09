<script lang="ts">
	import { themeStore } from './stores/theme';

	export let ticker: string;
</script>

{#if ticker}
	<div
		class="max-w-sm bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-400/20 rounded-full p-1"
	>
		<tv-ticker-tag symbol={ticker} hide-background size="medium" theme={$themeStore}
		></tv-ticker-tag>
	</div>
{/if}

<script lang="ts">
	export let ticker: string;
</script>

{#if ticker}
	<div class="max-w-sm bg-zinc-800 border border-zinc-400/20 rounded-full p-1">
		<tv-ticker-tag symbol={ticker} hide-background size="medium" theme="dark"></tv-ticker-tag>
	</div>
{/if}

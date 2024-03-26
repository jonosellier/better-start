<script lang="ts">
	import './icons.css';
	export let symbol: string;
</script>

{#if symbol.startsWith('bi-')}
	<i class={symbol + ' text-xl'}></i>
{:else}
	<i class="material-symbols-outlined text-xl">
		{symbol}
	</i>
{/if}

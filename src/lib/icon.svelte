<script lang="ts">
	import './icons.css';
	export let symbol: string;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'xl';
	export let classList = '';
</script>

{#if symbol.startsWith('bi-')}
	<i class={symbol + ' leading-none text-' + size + ' ' + classList}></i>
{:else}
	<i class="material-symbols-outlined text-{size} leading-none {classList}">
		{symbol}
	</i>
{/if}

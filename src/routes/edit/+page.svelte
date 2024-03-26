<script lang="ts">
	import { storageStore } from '$lib/stores/storage';
	import type { HomeLayout } from '$lib/types/home-layout';
	import { homeLayoutSchema } from '$lib/types/home-layout.schema';
	import { ZodError } from 'zod';

	let dataStr = JSON.stringify($storageStore, undefined, 2);

	let errors: ZodError[] = [];
	function save() {
		const myErrs: ZodError[] = [];
		let parsedData: HomeLayout;
		try {
			try {
				parsedData = JSON.parse(dataStr);
			} catch (e) {
				throw new ZodError([
					{
						code: 'custom',
						path: [],
						message: 'JSON parse error'
					}
				]);
			}
			homeLayoutSchema.parse(parsedData);
			storageStore.set(parsedData);
		} catch (e: any) {
			myErrs.push(e as ZodError);
		} finally {
			errors = myErrs;
		}
	}
</script>

<h1 class="text-2xl pb-5">Edit</h1>
<div class="w-screen max-w-2xl rounded-lg overflow-auto border border-zinc-600 mb-6">
	<textarea class="bg-zinc-900 block font-mono w-full p-3" rows="40" bind:value={dataStr}
	></textarea>
</div>
{#each errors as error}
	{#each error.issues as issue}
		<div
			class="bg-red-700 text-white border border-red-400 px-3 py-1 w-full my-3 rounded rounded-md"
		>
			{issue.message} at path
			<code class="bg-red-950 border border-zinc-600 rounded rounded-sm px-2 py-1"
				>root/{issue.path.join('/')}</code
			>.
		</div>
	{/each}
{/each}
<button class="btn bg-blue-800 text-blue-200 hover:bg-blue-700" on:click={() => save()}>Save</button
>

<!-- <pre>{@debug $storageStore }</pre> -->
<style>
	/* CSS */
</style>

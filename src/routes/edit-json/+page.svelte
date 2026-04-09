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
		} catch (e: unknown) {
			myErrs.push(e as ZodError);
		} finally {
			errors = myErrs;
		}
	}
</script>

<h1 class="text-2xl pb-5 ps-3">Edit</h1>
<div
	class="w-screen max-w-2xl rounded-lg overflow-auto border border-zinc-300 dark:border-zinc-600 mb-6"
>
	<textarea
		class="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white block font-mono w-full p-3"
		rows="25"
		bind:value={dataStr}
	></textarea>
</div>
{#each errors as error}
	{#each error.issues as issue}
		<div
			class="bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-200 border border-red-300 dark:border-red-700 px-3 py-1 w-full my-3 rounded rounded-md"
		>
			{issue.message} at path
			<code
				class="bg-red-200 dark:bg-red-900 border border-red-300 dark:border-zinc-600 rounded rounded-sm px-2 py-1 text-red-900 dark:text-red-200"
				>root/{issue.path.join('/')}</code
			>.
		</div>
	{/each}
{/each}
<button
	class="btn btn-primary text-white py-2 px-4 rounded-lg border duration-150 inline-block text-center"
	on:click={() => save()}>Save Changes</button
>

<!-- <pre>{@debug $storageStore }</pre> -->
<style>
	/* CSS */
</style>

import { HomeLayout } from '$lib/types/home-layout';
import { get, writable } from 'svelte/store';

export const storageStore = writable<HomeLayout>();

export function initStorageStore() {
	if (localStorage && !get(storageStore)) {
		const dataAsStr = localStorage.getItem('userData');
		const data: HomeLayout = JSON.parse(dataAsStr ?? 'null') ?? new HomeLayout();
		if (!data.cols) {
			data.cols = 4;
		}

		if (!data.commands) {
			data.commands = [];
		}
		storageStore.set(data);
		return true;
	}
	return false;
}

storageStore.subscribe((v) => {
	if (typeof window !== 'undefined' && v) {
		localStorage.setItem('userData', JSON.stringify(v));
	}
});

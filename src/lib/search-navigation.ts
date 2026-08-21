export type PaletteMode = 'command' | 'search' | 'direct-link';

export function isValidHttpsUrl(value: string) {
	const trimmed = value.trim();
	if (!trimmed || !trimmed.startsWith('https://')) {
		return false;
	}

	try {
		const url = new URL(trimmed);
		const hostname = url.hostname.trim();
		return url.protocol === 'https:' && hostname.length > 0 && hostname !== 'localhost';
	} catch {
		return false;
	}
}

export function resolvePaletteMode(
	query: string,
	currentMode: PaletteMode,
	previousMode: PaletteMode
) {
	const trimmedQuery = query.trim();
	if (trimmedQuery && isValidHttpsUrl(trimmedQuery)) {
		return {
			mode: 'direct-link' as const,
			previousMode: currentMode === 'direct-link' ? previousMode : currentMode
		};
	}

	if (currentMode === 'direct-link') {
		return {
			mode: previousMode,
			previousMode
		};
	}

	return {
		mode: currentMode,
		previousMode
	};
}

export function searchWeb(query: string) {
	window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function openDirectLink(url: string) {
	window.location.href = url;
}

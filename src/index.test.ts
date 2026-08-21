import { describe, it, expect, vi } from 'vitest';
import { isValidHttpsUrl, resolvePaletteMode, searchWeb } from './lib/search-navigation';

describe('search navigation', () => {
	it('navigates in the current tab for web searches', () => {
		const openSpy = vi.fn();
		vi.stubGlobal('window', {
			location: {
				href: 'http://localhost/'
			},
			open: openSpy
		});

		searchWeb('svelte kit');

		expect(openSpy).not.toHaveBeenCalled();
		expect(window.location.href).toBe('https://www.google.com/search?q=svelte%20kit');

		vi.unstubAllGlobals();
	});

	it('detects valid https URLs for direct-link mode', () => {
		expect(isValidHttpsUrl('https://example.com')).toBe(true);
		expect(isValidHttpsUrl('http://example.com')).toBe(false);
		expect(isValidHttpsUrl('not a url')).toBe(false);
	});

	it('exits direct-link mode when the url is backspaced away', () => {
		expect(resolvePaletteMode('https://example.com', 'command', 'command')).toMatchObject({
			mode: 'direct-link',
			previousMode: 'command'
		});
		expect(resolvePaletteMode('https://', 'direct-link', 'command')).toMatchObject({
			mode: 'command',
			previousMode: 'command'
		});
	});
});

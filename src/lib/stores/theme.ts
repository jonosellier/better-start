import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';
type ColorPalette = 'blue' | 'pink' | 'violet' | 'lime' | 'orange';

const colorPaletteValues: Record<ColorPalette, Record<string, string>> = {
	blue: {
		'200': '#bfdbfe',
		'400': '#60a5fa',
		'500': '#3b82f6',
		'600': '#2563eb',
		'700': '#1d4ed8',
		'800': '#1e40af'
	},
	pink: {
		'200': '#fbcfe8',
		'400': '#f472b6',
		'500': '#ec4899',
		'600': '#db2777',
		'700': '#be185d',
		'800': '#9d174d'
	},
	violet: {
		'200': '#ddd6fe',
		'400': '#a78bfa',
		'500': '#8b5cf6',
		'600': '#7c3aed',
		'700': '#6d28d9',
		'800': '#5b21b6'
	},
	lime: {
		'200': '#dcfce7',
		'400': '#4ade80',
		'500': '#22c55e',
		'600': '#16a34a',
		'700': '#15803d',
		'800': '#166534'
	},
	orange: {
		'200': '#fed7aa',
		'400': '#fb923c',
		'500': '#f97316',
		'600': '#ea580c',
		'700': '#c2410c',
		'800': '#9a3412'
	}
};

const THEME_KEY = 'theme-preference';
const COLOR_PALETTE_KEY = 'color-palette-preference';

const getInitialTheme = (): Theme => {
	if (!browser) return 'dark';

	const stored = localStorage.getItem(THEME_KEY) as Theme | null;
	if (stored) return stored;

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
};

const getInitialColorPalette = (): ColorPalette => {
	if (!browser) return 'blue';
	const stored = localStorage.getItem(COLOR_PALETTE_KEY) as ColorPalette | null;
	return stored || 'blue';
};

const applyColorPalette = (palette: ColorPalette) => {
	if (!browser) return;
	const colors = colorPaletteValues[palette];
	Object.entries(colors).forEach(([shade, value]) => {
		document.documentElement.style.setProperty(`--color-${shade}`, value);
	});
};

// Create theme store
function createThemeStore() {
	const initialTheme = getInitialTheme();
	if (browser) {
		document.documentElement.classList.toggle('dark', initialTheme === 'dark');
	}

	const { subscribe, set } = writable<Theme>(initialTheme);

	return {
		subscribe,
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem(THEME_KEY, theme);
				document.documentElement.classList.toggle('dark', theme === 'dark');
			}
			set(theme);
		},
		toggle: function () {
			let currentTheme: Theme = 'dark';
			subscribe((theme) => (currentTheme = theme))();
			this.set(currentTheme === 'dark' ? 'light' : 'dark');
		}
	};
}

// Create color palette store
function createColorPaletteStore() {
	const initialPalette = getInitialColorPalette();
	if (browser) {
		applyColorPalette(initialPalette);
	}

	const { subscribe, set } = writable<ColorPalette>(initialPalette);

	return {
		subscribe,
		set: (palette: ColorPalette) => {
			if (browser) {
				localStorage.setItem(COLOR_PALETTE_KEY, palette);
				applyColorPalette(palette);
			}
			set(palette);
		}
	};
}

export const themeStore = createThemeStore();
export const colorPaletteStore = createColorPaletteStore();
export type { Theme, ColorPalette };

# Better-Start: AI Agent Instructions

## Project Overview

**Better-Start** is a customizable home page dashboard built with **SvelteKit + TypeScript**, deployed as a static site to GitHub Pages. Users can configure personalized cards with links, time-based greetings, and responsive grid layouts—all persisted to browser localStorage.

## Architecture

### Data Flow

1. **Data Source**: [src/lib/data.ts](src/lib/data.ts) provides hardcoded `HomeLayout` (can be modified)
2. **Storage**: [src/lib/stores/storage.ts](src/lib/stores/storage.ts) handles:
   - Initial load from localStorage, defaulting to schema defaults if empty
   - Two-way sync: `storageStore` writes to localStorage on every change
   - Type: `HomeLayout` (see [src/lib/types/home-layout.ts](src/lib/types/home-layout.ts))
3. **Rendering**: [src/routes/+layout.svelte](src/routes/+layout.svelte) subscribes to `$storageStore` and renders cards

### Key Components

- **HomeLayout Schema** ([src/lib/types/home-layout.ts](src/lib/types/home-layout.ts)): `name`, `greetingHours[]`, `cards[]`, `cols` (grid width), optional `calendarLink`
- **HomeCard Component** ([src/lib/home-card.svelte](src/lib/home-card.svelte)): Renders individual card with emoji detection (regex check) or image fallback
- **Greeter Component** ([src/lib/greeter.svelte](src/lib/greeter.svelte)): Time-based greeting matching `greetingHours` ranges
- **Calendar Component** ([src/lib/calendar.svelte](src/lib/calendar.svelte)): Conditional display tied to `calendarLink`

### Static Site Adapter

- Uses `@sveltejs/adapter-static` ([svelte.config.js](svelte.config.js))
- Base path handling: production uses `/better-start`, development uses empty string
- Deploy via: `npm run deploy` → `gh-pages` pushes `/build` to GitHub Pages

## Critical Workflows

### Development

- `npm run dev` — Start local dev server with hot reload
- `npm run check` — Type-check Svelte + TypeScript (required before commits)
- `npm run format` — Auto-format with Prettier (includes Svelte plugin)

### Testing

- `npm run test` — Runs both unit (Vitest) and integration (Playwright) tests
- Unit tests: [src/\*_/_.{test,spec}.{js,ts}](src/) (minimal setup—[src/index.test.ts](src/index.test.ts) is template only)
- Playwright config: [playwright.config.ts](playwright.config.ts)

### Build & Deployment

- `npm run build` — Static build to `/build` directory
- `npm run deploy` — Push to GitHub Pages (predeploy hook auto-builds)

## Project Conventions

### Naming & Structure

- **Routes**: SvelteKit convention: `+layout.svelte` (root layout), `+page.svelte` (pages), `+layout.ts` (shared data)
- **Components**: PascalCase (e.g., `HomeCard`, `Greeter`)
- **Stores**: Named exports, `export const storageStore = writable<T>()`
- **Types**: Class definitions in `types/` folder with sensible defaults (see `HomeLayout`, `HomeCard`)

### Styling

- **Framework**: Tailwind CSS ([tailwind.config.js](tailwind.config.js)) with PostCSS
- **Colors**: Dark theme (bg-zinc-900, text-white); see [src/app.css](src/app.css) for global styles
- **Icons**: Mix of emojis (rendered directly) and image URLs (validated by EMOJI_REGEX in HomeCard)

### TypeScript & Zod

- Dependency: Zod for runtime validation (declared but not yet used extensively—good candidate for schema validation)
- Keep types in `/types` folder; use `export type` and `export class` for data structures

### localStorage Pattern

- Key: `"userData"` (hardcoded in [src/lib/stores/storage.ts](src/lib/stores/storage.ts))
- Auto-serialization: Writable store subscribes to persist changes automatically
- No server-side persistence—data is browser-local only

## Integration Points & Considerations

- **No Backend**: Fully client-side; customization requires code/data changes
- **GitHub Pages**: Relative paths adjusted via `base` import from `$app/paths`
- **Responsive Grid**: `cols` property controls layout width (default: 4); min-width per card is fixed (min-w-64)
- **Time-Based Logic**: Greeting logic in Greeter component matches hour ranges; adjust `greetingHours` array to customize
- **External Links**: All card links are external (`href` in HomeLink); open in same window

## Common Tasks

**Add a new card**: Modify `cards[]` array in [src/lib/data.ts](src/lib/data.ts) with `HomeCard` structure (title, icon, links[]).

**Change grid columns**: Update `cols` in data or localStorage; CSS uses `max-width: ${cols * 17 + 4.5}rem`.

**Add new greeting time range**: Insert new `TimedGreeting` object in `greetingHours[]` array; ensure hours don't overlap.

**Deploy changes**: `npm run deploy` auto-builds and pushes to GitHub Pages branch.

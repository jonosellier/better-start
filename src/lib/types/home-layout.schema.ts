import { z } from 'zod';

export const timedGreetingSchema = z.object({
	hours: z.tuple([z.number(), z.number()]),
	greeting: z.string(),
	emoji: z.string().optional()
});

export const homeLinkSchema = z.object({
	text: z.string(),
	href: z.string()
});

export const homeCardSchema = z.object({
	title: z.string(),
	icon: z.string(),
	links: z.array(homeLinkSchema)
});

export const homeLayoutSchema = z.object({
	name: z.string(),
	greetingHours: z.array(timedGreetingSchema),
	cards: z.array(homeCardSchema)
});

export type HomeLayout = {
	name: string;
	greetingHours: TimedGreeting[];
	cards: HomeCard[];
};

export type TimedGreeting = {
	hours: [number, number];
	greeting: string;
	emoji?: string;
};

export type HomeCard = {
	title: string;
	icon: string;
	links: HomeLink[];
};

export type HomeLink = {
	text: string;
	href: string;
};

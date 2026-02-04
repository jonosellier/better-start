export class TimedGreeting {
	hours: [number, number] = [0, 24];
	greeting: string = 'Hey there,';
	emoji?: string = '👋';
}

export class HomeCard {
	title: string = 'Get started';
	icon: string = '🚀';
	links: HomeLink[] = [
		{
			text: 'Click me to import',
			href: '/edit-json/'
		},
		{
			text: 'Click me to change settings',
			href: '/edit/'
		}
	];
}

export type HomeLink = {
	text: string;
	href: string;
};

export class HomeLayout {
	name: string = 'new user';
	greetingHours: TimedGreeting[] = [new TimedGreeting()];
	cards: HomeCard[] = [new HomeCard()];
	calendarLink?: string;
	cols: number = 4;
}

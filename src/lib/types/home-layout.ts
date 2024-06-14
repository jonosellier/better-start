export class TimedGreeting {
	hours: [number, number] = [0, 24];
	greeting: string = 'Hey there,';
	emoji?: string = '👋';
}

export class HomeCard {
	title: string = 'My card';
	icon: string = '🚀';
	links: HomeLink[] = [
		{
			text: 'Google',
			href: 'https://google.com'
		}
	];
}

export type HomeLink = {
	text: string;
	href: string;
};

export class HomeLayout {
	name: string = 'Person';
	greetingHours: TimedGreeting[] = [new TimedGreeting()];
	cards: HomeCard[] = [new HomeCard()];
	calendarLink?: string;
	cols: number = 4;
}

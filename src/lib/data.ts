import type { HomeLayout } from './types/home-layout';

export const data: HomeLayout = {
	name: 'Jono',
	greetingHours: [
		{
			hours: [0, 4],
			greeting: 'Good evening,',
			emoji: '🦉'
		},
		{
			hours: [4, 12],
			greeting: 'Good morning,',
			emoji: '☀️'
		},
		{
			hours: [12, 18],
			greeting: 'Good afternoon,',
			emoji: '☕'
		},
		{
			hours: [18, 23],
			greeting: 'Good evening,',
			emoji: '🦉'
		}
	],
	cards: [
		{
			title: 'Office 365',
			icon: '🏢',
			links: [
				{
					text: 'Google',
					href: 'https://www.google.com'
				},
				{
					text: 'Bing',
					href: 'https://www.bing.com'
				}
			]
		},
		{
			title: 'Search Engines',
			icon: '🔎',
			links: [
				{
					text: 'Google',
					href: 'https://www.google.com'
				},
				{
					text: 'Bing',
					href: 'https://www.bing.com'
				},
				{
					text: 'Google',
					href: 'https://www.google.com'
				},
				{
					text: 'Bing',
					href: 'https://www.bing.com'
				}
			]
		},
		{
			title: 'Search Engines',
			icon: '🔎',
			links: [
				{
					text: 'Google',
					href: 'https://www.google.com'
				},
				{
					text: 'Bing',
					href: 'https://www.bing.com'
				},
				{
					text: 'Google',
					href: 'https://www.google.com'
				},
				{
					text: 'Bing',
					href: 'https://www.bing.com'
				},
				{
					text: 'Google',
					href: 'https://www.google.com'
				},
				{
					text: 'Bing',
					href: 'https://www.bing.com'
				}
			]
		},
		{
			title: 'Search Engines',
			icon: '🔎',
			links: [
				{
					text: 'Google',
					href: 'https://www.google.com'
				},
				{
					text: 'Bing',
					href: 'https://www.bing.com'
				}
			]
		}
	],
	cols: 4,
	ticker: '',
	commands: []
};

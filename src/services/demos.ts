import { PAGES } from './constants'

export interface Demo {
	alt: string
	description: string
	href: string
	src: string
	title: string
}

export const getDemos = (): Demo[] => [
	{
		alt: 'Sample image of the Jersey ID project',
		description: 'Watching a football game and wonder who just caught that ball?  See who caught it with Jersey ID!',
		href: PAGES.DEMO_JERSEY_ID,
		src: '/404-img.jpg',
		title: 'Jersey ID',
	},
]
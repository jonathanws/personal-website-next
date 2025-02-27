import { PAGES } from './constants'

export interface Project {
	alt: string
	description: string
	href: string
	src: string
	title: string
}

export const getProjects = (): Project[] => [
	{
		alt: 'Sample image of the Jersey ID project',
		description: 'Watching a football game and wonder who just caught that ball?  See who caught it with Jersey ID!',
		href: PAGES.PROJECT_JERSEY_ID,
		src: '',
		title: 'Jersey ID',
	},
]
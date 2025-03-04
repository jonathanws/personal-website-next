const EMAIL_URL = 'mailto:jonathanws18@gmail.com'
const GITHUB_URL = 'https://github.com/jonathanws/'
const LINKEDIN_URL = 'https://www.linkedin.com/in/jon-smoley/'
const RESUME_URL = 'https://docs.google.com/document/d/1pBumRYjg3VZjA1r8Oxy7w0BdrGLjOXn2lFNxpqhVKOQ/edit?usp=sharing'

const NEXT_PUBLIC_HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME || ''
const NEXT_PUBLIC_SUPABASE_JERSEY_ID = process.env.NEXT_PUBLIC_SUPABASE_JERSEY_ID || ''
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const PROJECT_IDS = {
	JERSEY_ID: 'jersey-id',
} as const

const projectMap: Record<typeof PROJECT_IDS[keyof typeof PROJECT_IDS], string> = {
	'jersey-id': NEXT_PUBLIC_SUPABASE_JERSEY_ID,
}

/**
 * Returns either the domain where nextjs is hosted (used by <img> and <meta> tags), or gets the supabase backend urls for projects
 */
const getHostname = (project?: typeof PROJECT_IDS[keyof typeof PROJECT_IDS]) => project ? projectMap[project] : NEXT_PUBLIC_HOSTNAME

const PROJECTS = '/projects'

const PAGES: Record<Uppercase<string>, `/${string}`> = {
	BLOG: '/blog',
	HOME: '/',
	PROJECT_JERSEY_ID: `${PROJECTS}/${PROJECT_IDS.JERSEY_ID}`,
}

export {
	EMAIL_URL,
	GITHUB_URL,
	LINKEDIN_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
	PAGES,
	RESUME_URL,
	getHostname,
}
const EMAIL_URL = 'mailto:jonathanws18@gmail.com'
const GITHUB_URL = 'https://github.com/jonathanws/'
const LINKEDIN_URL = 'https://www.linkedin.com/in/jon-smoley/'
const RESUME_URL = 'https://docs.google.com/document/d/1pBumRYjg3VZjA1r8Oxy7w0BdrGLjOXn2lFNxpqhVKOQ/edit?usp=sharing'

const NEXT_PUBLIC_HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME || ''
const NEXT_PUBLIC_SUPABASE_JERSEY_ID = process.env.NEXT_PUBLIC_SUPABASE_JERSEY_ID || ''
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const DEMO_IDS = {
	JERSEY_ID: 'jersey-id',
	JSON_INSPECTOR: 'json-inspector',
} as const

const demoMap: Record<typeof DEMO_IDS[keyof typeof DEMO_IDS], string> = {
	'jersey-id': NEXT_PUBLIC_SUPABASE_JERSEY_ID,
	'json-inspector': '',
}

/**
 * Returns either the domain where nextjs is hosted (used by <img> and <meta> tags), or gets the supabase backend urls for demos
 */
const getHostname = (demo?: typeof DEMO_IDS[keyof typeof DEMO_IDS]) => demo ? demoMap[demo] : NEXT_PUBLIC_HOSTNAME

const DEMO = '/demo'

const PAGES: Record<Uppercase<string>, `/${string}`> = {
	BLOG: '/blog',
	DEMO_JERSEY_ID: `${DEMO}/${DEMO_IDS.JERSEY_ID}`,
	DEMO_JSON_INSPECTOR: `${DEMO}/${DEMO_IDS.JSON_INSPECTOR}`,
	HOME: '/',
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
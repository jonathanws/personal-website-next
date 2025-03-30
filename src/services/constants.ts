import { BlogPageUrl } from './blogPosts'
import { DemoPageUrl } from './demos'

const EMAIL_URL = 'mailto:jonathanws18@gmail.com'
const GITHUB_URL = 'https://github.com/jonathanws/'
const LINKEDIN_URL = 'https://www.linkedin.com/in/jon-smoley/'
const RESUME_URL = 'https://docs.google.com/document/d/1pBumRYjg3VZjA1r8Oxy7w0BdrGLjOXn2lFNxpqhVKOQ/edit?usp=sharing'

const NEXT_PUBLIC_HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME || ''
const NEXT_PUBLIC_SUPABASE_JERSEY_ID = process.env.NEXT_PUBLIC_SUPABASE_JERSEY_ID || ''
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

type DemoId =
	| 'jersey-id'

const demoMap: Record<DemoId, string> = {
	'jersey-id': NEXT_PUBLIC_SUPABASE_JERSEY_ID,
}

/**
 * Returns either the domain where nextjs is hosted (used by <img> and <meta> tags), or gets the supabase backend urls for demos
 */
const getHostname = (demo?: DemoId) => demo ? demoMap[demo] : NEXT_PUBLIC_HOSTNAME

/**
 * All pages for the entire website, including SSG urls
 */
type Page =
	| '/blog'
	| BlogPageUrl
	| DemoPageUrl
	| '/error'
	| '/'

export {
	type Page,
	EMAIL_URL,
	GITHUB_URL,
	LINKEDIN_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
	RESUME_URL,
	getHostname,
}
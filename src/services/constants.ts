const EMAIL_URL = 'mailto:jonathanws18@gmail.com'
const GITHUB_URL = 'https://github.com/jonathanws/'
const LINKEDIN_URL = 'https://www.linkedin.com/in/jon-smoley/'
const RESUME_URL = 'https://docs.google.com/document/d/1pBumRYjg3VZjA1r8Oxy7w0BdrGLjOXn2lFNxpqhVKOQ/edit?usp=sharing'

const NEXTJS_LOCAL_URL = 'http://192.168.86.194:3000'
const NEXTJS_PROD_URL = 'https://smoleycodes.com'
const SUPABASE_LOCAL_URL = 'http://127.0.0.1:54321/functions/v1'
const SUPABASE_JERSEY_ID_PROD_URL = 'TODO' // TODO: add production url

const isEnvironment = (env: 'development' | 'production' | 'test') => process.env.NODE_ENV === env

const PROJECT_IDS = {
	JERSEY_ID: 'jersey-id',
} as const
type ProjectId = typeof PROJECT_IDS[keyof typeof PROJECT_IDS]

/**
 * @param project returns backend for project, typically a supabase instance
 */
const getHostname = (project?: ProjectId) => {
	// projects might use separate backends, like supabase
	if (project) {
		return getHostnameForProject(project)
	}

	// used for <img> tags and head tags.  This is the main hostname of the website
	return isEnvironment('production')
		? NEXTJS_PROD_URL
		: NEXTJS_LOCAL_URL
}

const getHostnameForProject = (project: ProjectId): string => {
	switch (project) {
		case 'jersey-id':
			return isEnvironment('production')
				? SUPABASE_JERSEY_ID_PROD_URL
				: SUPABASE_LOCAL_URL
		default:
			// exhaustive switch - ensure that a new 'case' is added if a project id is added
			return project satisfies never
	}
}

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
	PAGES,
	RESUME_URL,
	getHostname,
	isEnvironment,
}
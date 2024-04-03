const EMAIL_URL = 'mailto:jonathanws18@gmail.com'
const GITHUB_URL = 'https://github.com/jonathanws/'
const LINKEDIN_URL = 'https://www.linkedin.com/in/jon-smoley/'
const RESUME_URL = 'https://docs.google.com/document/d/1pBumRYjg3VZjA1r8Oxy7w0BdrGLjOXn2lFNxpqhVKOQ/edit?usp=sharing'

const isEnvironment = (env: 'development' | 'production' | 'test') => process.env.NODE_ENV === env

const getHostname = () => {
	if (isEnvironment('production')) {
		return 'http://smoleycodes.com'
	}

	return 'http://192.168.86.194:3000'
}

export {
	EMAIL_URL,
	GITHUB_URL,
	LINKEDIN_URL,
	RESUME_URL,
	getHostname,
	isEnvironment,
}
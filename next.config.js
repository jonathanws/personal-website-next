/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'out',
	// only generate static exports instead of both static and dynamic
	output: 'export',
	// When true, this sometimes makes useEffect fire twice.  Make sure this is true for prod.
	// https://stackoverflow.com/a/71982736
	reactStrictMode: false,
	// without this, the url of the blog paid needed to end with "/blog.html".  This fixes that
	trailingSlash: true,
	// transpile dependencies that show 'unexpected token export' errors
	transpilePackages: ['react-syntax-highlighter'],
}

module.exports = nextConfig

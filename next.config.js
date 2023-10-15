/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'out',
	// only generate static exports instead of both static and dynamic
	output: 'export',
	reactStrictMode: true,
	// without this, the url of the blog paid needed to end with "/blog.html".  This fixes that
	trailingSlash: true,
	// transpile dependencies that show 'unexpected token export' errors
	transpilePackages: ['react-syntax-highlighter'],
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
	// only generate static exports instead of both static and dynamic
	output: 'export',
	reactStrictMode: true,
	// transpile dependencies that show 'unexpected token export' errors
	transpilePackages: ['react-syntax-highlighter'],
}

module.exports = nextConfig

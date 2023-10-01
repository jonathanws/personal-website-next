/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// transpile dependencies that show 'unexpected token export' errors
	transpilePackages: ['react-syntax-highlighter'],
}

module.exports = nextConfig

import { ParsedUrlQuery } from 'querystring'
import Box from '@mui/material/Box'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import BlogBody from '@/components/blog/Body'
import BlogDrawer from '@/components/blog/Drawer'
import BlogFooter from '@/components/blog/Footer'
import BlogHeader from '@/components/blog/Header'
import { getAuthor } from '@/services/blogAuthors'
import { getBlogPosts } from '@/services/blogPosts'
import { getHostname } from '@/services/constants'

/**
 * Generates the dynamic pages at runtime.  Also knows as SSG (server side generation).
 * This is different from SSR (server side rendering), which would happen upon user request.
 */
export const getStaticProps: GetStaticProps<
	Props, // what will be forwarded to the BlogArticle component
	ParsedUrlQuery & { url: string } // argument to the page at build-time
> = ({ params }) => ({
	props: {
		blogToDisplayId: params
			? getBlogPosts()
				.findIndex(({ url }) => url === params.url)
					|| 0
			: 0,
	},
})

/**
 * Since we are rendering all of our dynamic pages at runtime, Next needs to know what pages to render.
 * Create a map of all of the pages to render via their url (the argument to this html page)
 */
export const getStaticPaths: GetStaticPaths = () => ({
	fallback: false,
	paths: getBlogPosts().map(({ url }) => ({ params: { url } })),
})

interface Props {
	blogToDisplayId: number
}

export default function BlogArticle({ blogToDisplayId }: Props) {
	const blogToDisplay = getBlogPosts()[blogToDisplayId]
	const authorDisplayName = blogToDisplay && getAuthor(blogToDisplay.author).name

	const [drawerOpen, setDrawerOpen] = useState(false)
	const handleDrawerToggle = () => setDrawerOpen(!drawerOpen)

	return (
		<>
			<Head>
				{blogToDisplay &&
					<>
						<title>{blogToDisplay.bodyTitle}</title>

						{/* this line sometimes shows up in link previews */}
						<meta name='description' content={blogToDisplay.description} />
						<meta name='author' content={authorDisplayName}></meta>

						{/* this line provides an image when used in a link preview */}
						<meta property='og:image' content={`${getHostname()}${blogToDisplay.heroSrc}`} />
						<meta property='og:url' content={`${getHostname()}/blog/${blogToDisplay.url}`} />
						<meta property='og:title' content={blogToDisplay.bodyTitle} />
						<meta property='og:description' content={blogToDisplay.description} />
						<meta property='og:type' content='article' />
						<meta property='og:locale' content='en_US' />
					</>
				}
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>

			<Box>
				<BlogHeader onDrawerToggle={handleDrawerToggle} />

				<BlogDrawer
					drawerOpen={drawerOpen}
					onDrawerToggle={handleDrawerToggle}
				/>

				{blogToDisplay ? <BlogBody {...blogToDisplay} /> : null}

				<BlogFooter />
			</Box>
		</>
	)
}
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { getHostname } from '@/services/constants'
import { demoUrlPrefix, getDemos } from '@/services/demos'

// TODO: do I really need to export these?

/**
 * Generates the dynamic pages at runtime.  Also knows as SSG (server side generation).
 * This is different from SSR (server side rendering), which would happen upon user request.
 */
export const getStaticProps: GetStaticProps<
	Props, // what will be forwarded to the DemoArticle component
	ParsedUrlQuery & { url: string } // argument to the page at build-time
> = ({ params }) => ({
	props: {
		demoToDisplayId: params
			? getDemos()
				// demos are defined with the /demo/ prefix for their url, but next.js automatically
				// adds folder names when building urls.  Remove this prefix so there aren't duplicates
				.findIndex(({ url }) => url.startsWith(demoUrlPrefix)
					? url.slice(demoUrlPrefix.length)
					: url === params.url
				)
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
	paths: getDemos().map(({ url }) => ({
		params: {
			// demos are defined with the /demo/ prefix for their url, but next.js automatically
			// adds folder names when building urls.  Remove this prefix so there aren't duplicates
			url: url.startsWith(demoUrlPrefix)
				? url.slice(demoUrlPrefix.length)
				: url,
		},
	})),
})

interface Props {
	demoToDisplayId: number
}

export default function DemoArticle({ demoToDisplayId }: Props) {
	const demoToDisplay = getDemos()[demoToDisplayId]

	return (
		<>
			<Head>
				{demoToDisplay &&
					<>
						<title>{demoToDisplay.title}</title>

						{/* this line sometimes shows up in link previews */}
						<meta name='description' content={demoToDisplay.description} />

						{/* this line provides an image when used in a link preview */}
						<meta property='og:image' content={`${getHostname()}${demoToDisplay.heroSrc}`} />
						<meta property='og:url' content={`${getHostname()}/${demoToDisplay.url}`} />
						<meta property='og:title' content={demoToDisplay.title} />
						<meta property='og:description' content={demoToDisplay.description} />
						<meta property='og:type' content='article' />
						<meta property='og:locale' content='en_US' />
					</>
				}
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>

			{demoToDisplay.body()}
		</>
	)
}
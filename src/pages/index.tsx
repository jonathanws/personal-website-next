import Head from 'next/head'
import Demos from '@/components/Demos'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Interested from '@/components/Interested'
import Introduction from '@/components/Introduction'
import SeeMyBlog from '@/components/SeeMyBlog'
import Skills from '@/components/Skills'
import { BG_ALT, BG_PRIMARY } from '@/services/theming'

export default function Home() {
	const sections = [
		Introduction,
		Skills,
		Demos,
		SeeMyBlog,
		Interested,
	]

	return (
		<>
			<Head>
				<title>Smoley Codes</title>
				{/* this line sometimes shows up in link previews */}
				<meta name='description' content='Your favorite programmer' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>

			<Header />

			{
				sections.map((Section, index) => <Section
					backgroundColor={ index % 2 === 0 ? BG_ALT : BG_PRIMARY }
					key={index}
				/>)
			}

			{/* match whatever the previous section background color is */}
			<Footer backgroundColor={ sections.length % 2 === 0 ? BG_PRIMARY : BG_ALT } />
		</>
	)
}

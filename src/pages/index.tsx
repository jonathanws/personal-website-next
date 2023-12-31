import Head from 'next/head'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Interested from '@/components/Interested'
import Introduction from '@/components/Introduction'
import SeeMyBlog from '@/components/SeeMyBlog'
import Skills from '@/components/Skills'

export default function Home() {
	return (
		<>
			<Head>
				<title>Smoley Codes</title>
				{/* this line sometimes shows up in link previews */}
				<meta name='description' content='Your favorite programmer' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>

			<Header />

			<Introduction />

			<Skills />

			<SeeMyBlog />

			<Interested />

			<Footer />
		</>
	)
}

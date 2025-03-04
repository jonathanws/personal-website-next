import Head from 'next/head'
import Header from '@/components/Header'
import JerseyIdPageBody from '@/components/projects/jersey-id/JerseyIdPageBody'

export default function JerseyIdProjectPage() {
	return (
		<>
			<Head>
				<title>Jersey ID</title>
				{/* this line sometimes shows up in link previews */}
				<meta name='description' content="NFL Player Jersey Number Lookup" />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>

			<Header title='NFL Jersey ID' />

			<JerseyIdPageBody />
		</>
	)
}
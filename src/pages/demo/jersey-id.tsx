import Container from '@mui/material/Container'
import Head from 'next/head'
import PlayerLookup from '@/components/demo/jersey-id/PlayerLookup'

export default function JerseyIdDemoPage() {
	return (
		<>
			<Head>
				<title>Jersey ID</title>
				{/* this line sometimes shows up in link previews */}
				<meta name='description' content="NFL Player Jersey Number Lookup" />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>

			<Container
				disableGutters
				sx={{
					mt: {
						sm: 2,
					},
					p: {
						xs: 1,
					},
					// sizing styles that keep everything in a nice, narrow column
					width: {
						md: '680px',
						sm: '580px',
						xs: '100%',
					},
				}}
			>
				<PlayerLookup />
			</Container>
		</>
	)
}
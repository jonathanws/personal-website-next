import Container from '@mui/material/Container'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Fira_Code, Lato } from 'next/font/google'
import Head from 'next/head'
import { JsonContextProvider } from '@/components/demo/json-inspector/JsonContext'
import JsonInspector from '@/components/demo/json-inspector/JsonInspector'

const lato = Lato({
	subsets: ['latin'],
	weight: ['100', '300', '400', '700', '900'], // TODO: optimize
})
const firaCode = Fira_Code({
	subsets: ['latin'],
	weight: ['500', '400', '700' ], // TODO: optimize
})

export default function JsonInspectorDemoPage() {
	const jsonInspectorTheme = createTheme({
		components: {
			MuiTypography: {
				styleOverrides: {
					root: ({ ownerState }) => ({
						...(ownerState.component === 'code' && {
							fontFamily: firaCode.style.fontFamily, // Apply Fira Code only for code elements
						}),
					}),
				},
			},
		},
		palette: {
			mode: 'dark',
		},
		typography: {
			fontFamily: lato.style.fontFamily, // Default for everything
		},
	})

	return (
		<>
			<Head>
				<title>JSON Inspector</title>
				{/* this line sometimes shows up in link previews */}
				<meta name='description' content='Easily inspect your JSON' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>

			<ThemeProvider theme={jsonInspectorTheme}>
				<JsonContextProvider>
					<Container maxWidth={false} sx={{ border: '2px solid pink', height: '100%', p: 2 }}>
						<JsonInspector />
					</Container>
				</JsonContextProvider>
			</ThemeProvider>
		</>
	)
}
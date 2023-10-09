import { CssBaseline } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { Lato } from 'next/font/google'
import Head from 'next/head'
import { BG_ALT } from '@/services/theming'
import '@/styles/globals.css'

const lato = Lato({
	fallback: ['Arial', 'sans-serif'],
	subsets: ['latin'],
	weight: ['100', '300', '400', '700', '900'], // TODO: optimize
})

const theme = createTheme({
	palette: {
		background: {
			default: BG_ALT,
		},
		mode: 'dark',
		primary: {
			main: blue[700],
		},
	},
	typography: {
		allVariants: {
			color: grey[300],
		},
		body1: {
			fontSize: '1.125rem',
			lineHeight: '2rem',
		},
		button: {
			fontWeight: 700,
		},
		fontFamily: lato.style.fontFamily,
		h1: {
			fontSize: '3rem',
			fontWeight: 700,
		},
		h2: {
			fontSize: '2.5rem',
			fontWeight: 700,
		},
		h3: {
			fontSize: '2rem',
			fontWeight: 700,
			marginBottom: 32,
			marginTop: 32,
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 700,
			marginBottom: 12,
			marginTop: 24,
		},
		h5: {
			fontSize: '1rem',
		},
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				{/* favicon code */}
				<link rel="shortcut icon" href="/images/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
			</Head>

			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

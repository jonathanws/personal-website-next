import Container from '@mui/material/Container'
import { grey } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import localFont from 'next/font/local'
import Head from 'next/head'
import JerseyIdArticle from '@/components/demo/jersey-id/JerseyIdArticle'
import PlayerLookup from '@/components/demo/jersey-id/PlayerLookup'
import { JerseyIdContextProvider } from '@/contexts/JerseyIdDemoContext'

// for whatever reason, this is unable to find text files without the '../../../public' prefix
const forgottenFuturist = localFont({
	src: [
		{
			path: '../../../public/fonts/ForgottenFuturist-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../../public/fonts/ForgottenFuturist-RegularItalic.otf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../../public/fonts/ForgottenFuturist-Bold.otf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../../public/fonts/ForgottenFuturist-BoldItalic.otf',
			weight: '700',
			style: 'italic',
		},
	],
})

/**
 * Tweak Material's interface to allow a new Typography variant
 *
 * {@link https://mui.com/material-ui/customization/typography/#adding-amp-disabling-variants}
 */
declare module '@mui/material/styles' {
	interface TypographyVariants {
		sport: React.CSSProperties
	}

	// allow configuration using `createTheme()`
	interface TypographyVariantsOptions {
		sport?: React.CSSProperties
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		sport: true
	}
}

export default function JerseyIdDemoPage() {
	const jerseyIdTheme = createTheme({
		components: {
			MuiTypography: {
				defaultProps: {
					variantMapping: {
						sport: 'p', // map the variant to a <p> tag
					}
				}
			}
		},
		typography: {
			sport: {
				fontFamily: forgottenFuturist.style.fontFamily,
				fontStyle: 'italic',
				fontWeight: 700,
				color: grey[300],
			}
		},
		palette: {
			mode: 'dark',
		}
	})

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
					my: {
						sm: 4,
						xs: 0,
					},
					// sizing styles that keep everything in a nice, narrow column
					width: {
						md: '680px',
						sm: '580px',
						xs: '100%',
					},
				}}
			>
				<JerseyIdContextProvider>
					<ThemeProvider theme={jerseyIdTheme}>
						<PlayerLookup />
					</ThemeProvider>
				</JerseyIdContextProvider>
			</Container>
		</>
	)
}
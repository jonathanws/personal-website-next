import SportsFootballRounded from '@mui/icons-material/SportsFootballRounded'
import { blue, brown, grey } from '@mui/material/colors'
import Container from '@mui/material/Container'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Lato } from 'next/font/google'
import localFont from 'next/font/local'
import { useState } from 'react'
import BlogDrawer from '@/components/blog/Drawer'
import BlogHeader from '@/components/blog/Header'
import JerseyIdArticle from '@/components/demo/jersey-id/article/JerseyIdArticle'
import { Demo } from '@/services/demos'

const IMG_DIR = '/demo/whos-wearing-that-number'
// for whatever reason, this is unable to find text files without the '../../../../public' prefix
const forgottenFuturist = localFont({
	src: [
		{
			path: '../../../../public/fonts/ForgottenFuturist-Regular.otf',
			style: 'normal',
			weight: '400',
		},
		{
			path: '../../../../public/fonts/ForgottenFuturist-RegularItalic.otf',
			style: 'italic',
			weight: '400',
		},
		{
			path: '../../../../public/fonts/ForgottenFuturist-Bold.otf',
			style: 'normal',
			weight: '700',
		},
		{
			path: '../../../../public/fonts/ForgottenFuturist-BoldItalic.otf',
			style: 'italic',
			weight: '700',
		},
	],
})
const lato = Lato({
	fallback: ['Arial', 'sans-serif'],
	subsets: ['latin'],
	weight: ['700'],
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

const JerseyIdDemo = (): React.ReactNode => {
	const jerseyIdTheme = createTheme({
		components: {
			MuiTypography: {
				defaultProps: {
					variantMapping: {
						sport: 'p', // map the variant to a <p> tag
					},
				},
			},
		},
		palette: {
			mode: 'dark',
			primary: {
				main: blue[700],
			},
		},
		typography: {
			allVariants:{
				color: grey[300],
			},
			// used/not-used in the article
			body1: {
				fontSize: '1.125rem',
				lineHeight: '2rem',
			},
			button: {
				fontWeight: 700,
			},
			fontFamily: lato.style.fontFamily,
			h1: {
				fontSize: '2.5rem',
				fontWeight: 700,
				lineHeight: 1,
				marginBottom: 24,
				marginTop: 12,
			},
			h2: {
				fontSize: '2rem',
				fontWeight: 700,
				marginBottom: 16,
				marginTop: 8,
			},
			h3: {
				fontSize: '1.75rem',
				fontWeight: 700,
				marginBottom: 14,
				marginTop: 7,
			},
			h4: undefined,
			h5: undefined,
			h6: undefined,
			// used in the main widget
			sport: {
				color: grey[300],
				fontFamily: forgottenFuturist.style.fontFamily,
				fontStyle: 'italic',
				fontWeight: 700,
			},
		},
	})

	const [drawerOpen, setDrawerOpen] = useState(false)
	const handleDrawerToggle = () => setDrawerOpen(!drawerOpen)

	return (
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
			<BlogDrawer drawerOpen={drawerOpen} onDrawerToggle={handleDrawerToggle} />

			<BlogHeader onDrawerToggle={handleDrawerToggle} />

			<ThemeProvider theme={jerseyIdTheme}>
				<JerseyIdArticle />
			</ThemeProvider>
		</Container>
	)
}

const jerseyIdDemo: Demo = {
	alt: 'Sample image of the Who\'s Wearing That Number demo',
	body: JerseyIdDemo,
	description: 'Watching a game and wonder who just caught that ball?  See who caught it with Who\'s Wearing That Number',
	heroSrc: `${IMG_DIR}/hero.png`,
	icon: <SportsFootballRounded sx={{ color: brown[500] }} />,
	title: 'Who\'s Wearing That Number?',
	url: '/demo/whos-wearing-that-number',
}

export default jerseyIdDemo
import { ParsedUrlQuery } from 'querystring'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import BlogBody from '@/components/blog/Body'
import BlogFooter from '@/components/blog/Footer'
import SiteLogo from '@/components/SiteLogo'
import { getAuthor } from '@/services/blogAuthors'
import { BlogPost, getBlogPosts } from '@/services/blogPosts'
import { getHostname } from '@/services/constants'
import { BG_ALT } from '@/services/theming'

/**
 * Generates the dynamic pages at runtime.  Also knows as SSG (server side generation).
 * This is different from SSR (server side rendering), which would happen upon user request.
 */
export const getStaticProps: GetStaticProps<
	{ blogToDisplayId: number }, // what will be forwarded to the BlogArticle component
	ParsedUrlQuery & { url: string } // argument to the page at build-time
> = ({ params }) => {
	return {
		props: {
			blogToDisplayId: params
				? getBlogPosts()
					.findIndex(({ url }) => url === params.url)
					|| 0
				: 0,
		},
	}
}

/**
 * Since we are rendering all of our dynamic pages at runtime, Next needs to know what pages to render.
 * Create a map of all of the pages to render via their url (the argument to this html page)
 */
export const getStaticPaths: GetStaticPaths = () => ({
	fallback: false,
	paths: getBlogPosts().map(({ url }) => ({ params: { url } })),
})

export default function BlogArticle({ blogToDisplayId }: { blogToDisplayId: number }) {
	const router = useRouter()

	const blogToDisplay = getBlogPosts()[blogToDisplayId]
	const authorDisplayName = blogToDisplay && getAuthor(blogToDisplay.author).name

	const [mobileOpen, setMobileOpen] = useState(false)
	const theme = useTheme()

	const drawerWidth = 300
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
	const handleLogoClick = () => router.push('/')
	const onDrawerItemSelected = (url: BlogPost['url']) => {
		handleDrawerToggle()
		router.push(`/blog/${url}`)
	}

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
						<meta property="og:locale" content="en_US" />
					</>
				}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/favicon.ico" />
			</Head>

			<Box>
				{/* Bar at the top of the main content */}
				<AppBar position='fixed' elevation={1} sx={{ background: BG_ALT }}>
					<Toolbar>
						<IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} sx={{ mr: { md: 2 } }}>
							<MenuIcon />
						</IconButton>

						<IconButton onClick={handleLogoClick} sx={{ mr: { md: 2, sx: 1 } }}>
							<SiteLogo />
						</IconButton>

						<Typography variant='h6' noWrap component='div'>Blog</Typography>
					</Toolbar>
				</AppBar>

				<Box component='nav' aria-label='blog articles'>
					<Drawer
						variant='temporary'
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{ keepMounted: true }} // Better open performance on mobile
						sx={{
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}>
						<div style={{
							backgroundColor: BG_ALT,
							height: '100%',
						}}>
							<Toolbar>
								<Typography variant='h6'>Articles</Typography>
							</Toolbar>

							<List>
								{getBlogPosts().map(({ icon, menuTitle, url }, index) => (
									<ListItem key={index} disablePadding
										sx={{
											'& .Mui-selected .MuiListItemText-primary': {
												color: theme.palette.primary.light,
											},
											'&:hover .MuiListItemText-primary': {
												color: 'white',
											},
										}}>
										<ListItemButton onClick={() => onDrawerItemSelected(url)} selected={url == router.query.url}>
											<ListItemIcon>{icon}</ListItemIcon>
											<ListItemText primary={menuTitle} />
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</div>
					</Drawer>
				</Box>

				{blogToDisplay ? <BlogBody {...blogToDisplay} /> : null}

				<BlogFooter />
			</Box>
		</>
	)
}
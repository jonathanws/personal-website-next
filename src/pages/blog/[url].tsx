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
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogBody from '@/components/blog/Body'
import BlogFooter from '@/components/blog/Footer'
import SiteLogo from '@/components/SiteLogo'
import { BlogPost, getBlogPosts } from '@/services/blogPosts'
import { getHostname } from '@/services/constants'
import { BG_ALT } from '@/services/theming'

const drawerWidth = 300

export default function BlogArticle() {
	const router = useRouter()

	const blogPosts = getBlogPosts()
	const [blogToDisplay, setBlogToDisplay] = useState<BlogPost>()

	useEffect(() => {
		if (!router.isReady) {
			return
		}

		const _blogToDisplay = blogPosts.find(({ url }) => url === router.query.url)

		if (!_blogToDisplay) {
			console.log('attempting to display a blog that does not exist', router.query.url)
			return
		}

		setBlogToDisplay(_blogToDisplay)
	}, [router.isReady])

	const [mobileOpen, setMobileOpen] = useState(false)
	const theme = useTheme()

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
						<meta name="description" content={blogToDisplay.description} />

						{/* this line provides an image when used in a link preview */}
						<meta name='og:image' content={`${getHostname()}${blogToDisplay.heroSrc}`} />
						<meta name='og:title' content={blogToDisplay.bodyTitle} />
						<meta name='og:description' content={blogToDisplay.description} />
					</>
				}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
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
								{blogPosts.map(({ icon, menuTitle, url }, index) => (
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
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { BlogPost, getBlogPosts } from '@/services/blogPosts'
import { BG_ALT } from '@/services/theming'

interface Props {
	drawerOpen: boolean
	onDrawerToggle: () => void
}

export default function BlogDrawer({ drawerOpen, onDrawerToggle }: Props) {
	const theme = useTheme()
	const drawerWidth = 300

	const router = useRouter()
	const onDrawerItemSelected = (url: BlogPost['url']) => {
		onDrawerToggle()
		router.push(`/blog/${url}`)
	}

	return (
		<Box
			component='nav'
			aria-label='blog articles'
		>
			<Drawer
				variant='temporary'
				open={drawerOpen}
				onClose={onDrawerToggle}
				ModalProps={{ keepMounted: true }} // better open performance on mobile
				sx={{
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
			>
				<div style={{
					backgroundColor: BG_ALT,
					height: '100%',
				}}>
					<Toolbar>
						<Typography variant='h6'>Articles</Typography>
					</Toolbar>

					<List>
						{getBlogPosts().map(({ icon, menuTitle, url }, index) => (
							<ListItem
								key={index}
								disablePadding
								sx={{
									'& .Mui-selected .MuiListItemText-primary': {
										color: theme.palette.primary.light,
									},
									'&:hover .MuiListItemText-primary': {
										color: 'white',
									},
								}}>
								<ListItemButton
									onClick={() => onDrawerItemSelected(url)}
									selected={url == router.query.url}
								>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={menuTitle} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</div>
			</Drawer>
		</Box>
	)
}
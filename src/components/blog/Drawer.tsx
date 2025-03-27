import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import { darken, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { getBlogPosts } from '@/services/blogPosts'
import { Page } from '@/services/constants'
import { getDemos } from '@/services/demos'
import { BG_ALT } from '@/services/theming'
import ExpandableDrawerSection from './ExpandableDrawerSection'

interface Props {
	drawerOpen: boolean
	onDrawerToggle: () => void
}

export default function BlogDrawer({ drawerOpen, onDrawerToggle }: Props) {
	const theme = useTheme()
	const drawerWidth = 300

	const router = useRouter()
	const onDrawerItemSelected = (url: Page) => {
		onDrawerToggle()
		router.push(url)
	}

	return (
		<Box component='nav' aria-label='Navigation drawer'>
			<Drawer
				variant='temporary'
				open={drawerOpen}
				onClose={onDrawerToggle}
				ModalProps={{ keepMounted: true }} // better open performance on mobile
				PaperProps={{
					sx: {
						backgroundColor: BG_ALT,
						backgroundImage: 'unset',
						width: drawerWidth,
					},
				}}
			>
				<ExpandableDrawerSection
					title='Articles'
					items={getBlogPosts()}
					onItemClick={(article) => onDrawerItemSelected(article.url)}
					isItemSelected={(article) => article.url === router.query.url}
					listItemIcon={(article) => article.icon}
					listItemText={(article) => article.menuTitle}
				/>

				<Divider sx={{ borderColor: darken(theme.palette.text.primary, .4), borderWidth: 1, m: [6, 3, 6, 3] }} />

				<ExpandableDrawerSection
					title='Demos'
					items={getDemos()}
					onItemClick={(demo) => onDrawerItemSelected(demo.url)}
					isItemSelected={(demo) => demo.url === router.query.url}
					listItemText={(demo) => demo.title}
				/>
			</Drawer>
		</Box>
	)
}
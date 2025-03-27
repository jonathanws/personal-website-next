import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import SiteLogo from '@/components/SiteLogo'
import { BG_ALT } from '@/services/theming'

interface Props {
	onDrawerToggle: () => void
}

export default function BlogHeader({ onDrawerToggle }: Props) {
	const router = useRouter()
	const handleLogoClick = () => router.push('/')

	return (
		<AppBar
			position='fixed'
			elevation={1}
			sx={{ background: BG_ALT }}
		>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					edge='start'
					onClick={onDrawerToggle}
					sx={{ mr: { md: 2 } }}
				>
					<MenuIcon />
				</IconButton>

				<IconButton
					onClick={handleLogoClick}
					sx={{
						mr: {
							sm: 3,
							xs: 1,
						},
					}}
				>
					<SiteLogo />
				</IconButton>

				<Typography
					variant='h6'
					noWrap
					component='div'
				>
					Blog
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
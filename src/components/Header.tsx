import { default as GitHubIcon } from '@mui/icons-material/GitHub'
import { default as LinkedInIcon } from '@mui/icons-material/LinkedIn'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { GITHUB_URL, LINKEDIN_URL } from '@/services/constants'
import { BG_ALT, headerPaddings } from '@/services/theming'
import SiteLogo from './SiteLogo'

export default function Header() {
	return (
		<AppBar position="static" color='transparent' elevation={0} sx={{ backgroundColor: BG_ALT }}>
			<Container sx={headerPaddings}>
				<Toolbar disableGutters>
					<Stack direction='row' spacing={2}>
						<SiteLogo />
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							Jon Smoley
						</Typography>
					</Stack>

					<Box sx={{ flexGrow: 1 }} />

					<Stack direction='row' spacing={2}>
						<IconButton aria-label="linkedin" href={LINKEDIN_URL} target="_blank">
							<LinkedInIcon />
						</IconButton>
						<IconButton aria-label="github" href={GITHUB_URL} target="blank">
							<GitHubIcon />
						</IconButton>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

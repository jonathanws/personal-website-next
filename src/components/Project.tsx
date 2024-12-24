import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { PAGES } from '@/services/constants'
import { BG_ALT, sectionPaddings } from '@/services/theming'

export default function Projects() {
	return (
		<Box sx={{ backgroundColor: BG_ALT }}>
			<Container sx={sectionPaddings}>
				<Typography variant='h3'>Projects</Typography>

				<Button
					color='primary'
					variant='contained'
					href={PAGES.PROJECT_WHOS_PLAYING}
				>
					Who&apos;s Playing?
				</Button>
			</Container>
		</Box>
	)
}
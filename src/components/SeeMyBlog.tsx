import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { BG_ALT, sectionPaddings } from '@/services/theming'

export default function SeeMyBlog() {
	return (
		<Box sx={{ backgroundColor: BG_ALT }}>
			<Container sx={sectionPaddings}>
				<Typography variant='h3'>See My Blog</Typography>

				<Button size='large' variant='contained' href='/blog'>
					Blog
				</Button>
			</Container>
		</Box>
	)
}

import { default as ArticleIcon } from '@mui/icons-material/Article'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { RESUME_URL } from '@/services/constants'
import { BG_ALT, sectionPaddings } from '@/services/theming'

export default function Introduction() {
	const theme = useTheme()
	const isLargeDevice = useMediaQuery(theme.breakpoints.up('sm'))

	return (
		<Box sx={{ backgroundColor: BG_ALT }}>
			<Container sx={sectionPaddings}>
				{
					isLargeDevice
						? <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', pb: 3, pt: 6 }}>
							<Box sx={{ flexGrow: 1 }}>
								<Typography variant="h2" sx={{ mb: 5 }}>Hey, I&apos;m Jon 👋</Typography>
								<Typography variant="h1">A <span style={{ color: theme.palette.primary.main }}>software engineer</span></Typography>
								<Typography variant="h1" sx={{ mb: 4 }}>in Denver, Colorado</Typography>

								<Button size='large' color="primary" variant="contained" startIcon={<ArticleIcon />} href={RESUME_URL} target='_blank'>
									See Resume
								</Button>
							</Box>

							<img src='/jon-hero.jpg' alt="its a-me" style={{ borderRadius: '50%', width: '30%' }}></img>
						</Box>
						: <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', pb: 3, pt: 6 }}>
							<Typography variant="h4" sx={{ mb: 3 }}>Hey, I&apos;m Jon 👋</Typography>
							<Typography variant="h3" sx={{ mb: 0 }}>A <span style={{ color: theme.palette.primary.main }}>software engineer</span></Typography>
							<Typography variant="h3" sx={{ mb: 5, mt: 1 }}>in Denver, Colorado</Typography>

							<img src='/jon-hero.jpg' alt="its a-me" style={{ borderRadius: '50%', width: '70%' }}></img>

							<Button size='large' color="primary" variant="contained" startIcon={<ArticleIcon />} href={RESUME_URL} target='_blank' sx={{ mt: 4 }}>
								See Resume
							</Button>
						</Box>
				}
			</Container>
		</Box>
	)
}

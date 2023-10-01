import { EMAIL_URL, GITHUB_URL, LINKEDIN_URL } from '@/services/constants'
import { BG_PRIMARY, sectionPaddings } from '@/services/theming'
import { default as EmailIcon } from '@mui/icons-material/Email'
import { default as GitHubIcon } from '@mui/icons-material/GitHub'
import { default as LinkedInIcon } from '@mui/icons-material/LinkedIn'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function Interested() {
	return (
		<Box sx={{ backgroundColor: BG_PRIMARY }}>
			<Container sx={sectionPaddings}>
				<Typography variant="h4" marginY={4} sx={{ textAlign: 'center' }}>Interested? Let me know!</Typography>

				<Box sx={{ display: 'flex', justifyContent: 'center', m: '32px' }}>
					<Avatar alt="jon smoley" src='/jon-hero.jpg' sx={{ height: 96, width: 96 }} />

					<Stack spacing={1} sx={{ justifyContent: 'center', ml: '20px' }}>
						<Typography variant='h5'>Jon Smoley</Typography>
						<Typography variant='caption'>Ex-FAANG Full-stack engineer</Typography>
					</Stack>
				</Box>

				<Stack direction={{ sm: 'row', xs: 'column' }} spacing={4} sx={{ justifyContent: 'center' }}>
					<Button size='large' variant='contained' startIcon={<EmailIcon />} href={EMAIL_URL} target='_blank'>
						Get in touch
					</Button>

					<Button size='large' variant='contained' startIcon={<LinkedInIcon />} href={LINKEDIN_URL} target='_blank'>
						Connect with me
					</Button>

					<Button size='large' variant='contained' startIcon={<GitHubIcon />} href={GITHUB_URL} target='_blank'>
						Check my squares
					</Button>
				</Stack>
			</Container>
		</Box>
	)
}

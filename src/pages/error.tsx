import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function ErrorPage() {
	return (
		<Container>
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection='column'>
				<Typography variant='h1' style={{ fontSize: '8rem' }}>404</Typography>
				<Typography variant='h2' style={{ marginBottom: 64 }}>Page not found</Typography>

				<Typography variant='body1'>But its not all bad news. Have a puppy</Typography>

				<img alt='pepper' src='/404-img.jpg' style={{ borderRadius: '50%', marginBottom: 32, marginTop: 32, maxHeight: '16em' }} />

				<Button href='/' size='large' variant='contained'>Back to home page</Button>
			</Box>
		</Container>
	)
}
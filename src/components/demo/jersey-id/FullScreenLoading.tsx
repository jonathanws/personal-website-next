import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function FullScreenLoading() {
	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='center'
			position='absolute'
			zIndex={9999}
			bgcolor='rgba(255, 255, 255, 0.4)'
			sx={{ inset: 0 }}
		>
			<CircularProgress size='8rem' />
		</Box>
	)
}
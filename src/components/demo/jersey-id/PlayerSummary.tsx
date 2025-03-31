import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'
import { backgroundColor } from './PlayerLookup'

export default function PlayerSummary() {
	const theme = useTheme()
	const [player] = useJerseyIdContext((store) => store.playerAndTeam?.player)
	const isXs = useMediaQuery(theme.breakpoints.down('sm'))

	// instead of not showing this component when player is undefined, default all values to empty-string,
	// and turn down their opacity.  This will prevent the screen from 'jumping' when they're loaded.
	const displayHeight = player?.displayHeight || ''
	const jersey = player?.jersey || ''
	const fullName = player?.fullName || ''
	const positionName = player?.position.name || ''
	const displayWeight = player?.displayWeight || ''

	const textShadow = `2px 2px 4px ${backgroundColor}` // ensure any text is visible against the gradient from the headshot component
	const jerseyTextSize = isXs ? '4.5rem' : '6rem'

	return (
		<Box
			display='flex'
			gap={2}
			mt={-6}
			mx={isXs ? 1 : 4}
			alignItems='center'
			position='relative'
			zIndex={5}
		>
			<Typography
				variant='sport'
				fontSize={jerseyTextSize}
				lineHeight={jerseyTextSize}
				sx={{
					opacity: jersey ? 1 : 0,
					textShadow,
				}}
			>
				{`#${jersey}`}
			</Typography>

			<Box
				flexGrow={1}
				textAlign='center'
			>
				<Typography
					variant='sport'
					fontSize={isXs ? '2rem' : '3rem'}
					sx={{
						mb: isXs ? 0 : 1,
						opacity: fullName ? 1 : 0,
						textShadow,
					}}
				>
					{fullName}
				</Typography>

				<Typography
					variant='sport'
					fontSize={isXs ? '1rem' : '1.5rem'}
					color={grey[400]}
					sx={{
						opacity: positionName ? 1 : 0,
						textShadow,
					}}
				>
					{positionName} - {displayHeight} - {displayWeight}
				</Typography>
			</Box>
		</Box>
	)
}
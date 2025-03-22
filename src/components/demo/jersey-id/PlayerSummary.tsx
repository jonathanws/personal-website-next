import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'

export default function PlayerSummary() {
	const [player] = useJerseyIdContext((store) => store.playerAndTeam?.player)

	if (!player) {
		return
	}

	const { displayHeight, jersey, fullName, position, displayWeight } = player

	return (
		<Box
			display='flex'
			gap={2}
			alignItems='center'
		>
			<Typography fontSize='3em'>{`#${jersey}`}</Typography>

			<Box
				flexGrow={1}
				textAlign='center'
			>
				<Typography fontSize='1.3em'>{fullName}</Typography>
				<Typography>{position.name} - {displayHeight} - {displayWeight}</Typography>
			</Box>
		</Box>
	)
}
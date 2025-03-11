import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
	height: string
	jersey: string
	name: string
	position: string
	weight: string
}

export default function PlayerSummary({ height, jersey, name, position, weight }: Props) {
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
				<Typography fontSize='1.3em'>{name}</Typography>
				<Typography>{position} - {height} - {weight}</Typography>
			</Box>
		</Box>
	)
}
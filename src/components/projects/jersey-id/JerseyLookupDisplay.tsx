import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { NFLAthlete } from '@/services/nfl-service'

interface Props extends NFLAthlete {}

export default function JerseyLookupDisplay({ headshot, fullName, position, jersey }: Props) {
	return <Box display='flex' flexDirection='column' sx={{ border: '1px solid cyan' }}>
		<Box
			component='img'
			alt={headshot.alt}
			src={headshot.href}
			sx={{
				// border: '1px solid pink',
				height: '100%',
				width: '100%',
				// display: 'block',
			}}
		/>

		<Box display='flex' sx={{ justifyContent: 'center' }}>
			<Typography display='inline' sx={{ mr: .5 }}>{`#${jersey}`}</Typography>
			<Typography display='inline'>{fullName}</Typography>
			<Typography display='inline' sx={{ ml: .5 }}>{`(${position.abbreviation})`}</Typography>
		</Box>
	</Box>
}
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { getTeams, NFLTeam } from '@/services/nfl-service'
import JerseyLookup from './JerseyLookup'
import ProjectInstructions from '../ProjectInstructions'

export default function JerseyIdPageBody() {
	const [teams, setTeams] = useState<NFLTeam[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)

			try {
				const _teams = await getTeams()

				if (_teams) {
					setTeams(_teams)
				}
			} catch (e) {
				console.error(e, 'Error fetching teams')
			}

			setLoading(false)
		}

		fetchData()
	}, [])

	// sizing styles that keep everything in a nice, narrow column
	const contentContainerStyles = {
		width: {
			md: '680px',
			sm: '580px',
			xs: '100%',
		},
	}

	const getBodyDisplay = () => {
		if (loading) {
			return <CircularProgress size={80} sx={{ mt: 8 }} />
		}

		if (teams?.length) {
			return <JerseyLookup teams={teams} />
		}

		return <Alert
			severity='error'
			sx={{ mt: 4 }}
			variant='outlined'
		>
			<AlertTitle>Error fetching teams</AlertTitle>
			Something went wrong with fetching teams.  Try refreshing the page.
		</Alert>
	}

	return <Container
		maxWidth={false}
		sx={{
			// backgroundColor: BG_PRIMARY,
			// border: '1px solid green',
			display: 'flex',
			// height: '100%',
			justifyContent: 'center',
		}}
	>
		<Box
			sx={{
				...contentContainerStyles,
				alignItems: 'center',
				border: '1px solid yellow',
				display: 'flex',
				flexDirection: 'column',
				p: 1,
				pt: 4,
			}}
		>
			<ProjectInstructions
				title='NFL Jersey ID Lookup'
				text='Ever wonder who just caught the ball?  Pick a team and a jersey number to see who it is!'
			/>

			{getBodyDisplay()}
		</Box>
	</Container>
}
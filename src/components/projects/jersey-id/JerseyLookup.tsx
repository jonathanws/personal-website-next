import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { getPlayerByTeamIdAndJersey, getRandomPlayer, NFLAthlete, NFLTeam } from '@/services/nfl-service'
import JerseyLookupBottomBar from './JerseyLookupBottomBar'
import JerseyLookupDisplay from './JerseyLookupDisplay'

interface Props {
	teams: NFLTeam[]
}

export default function JerseyLookup({ teams }: Props) {
	const [player, setPlayer] = useState<NFLAthlete>() // TODO: useMemo()?
	const [teamId, setTeamId] = useState('')
	const [loading, setLoading] = useState(false)

	const onPlayerSearch = async (teamId: string, jerseyNumber: string) => {
		console.log('onplayersearch')

		try {
			setLoading(true)
			setPlayer(await getPlayerByTeamIdAndJersey(teamId, jerseyNumber))
		} catch (e) {
			console.error(e, 'some error occurred')
		}

		setLoading(false)
	}

	// Randomly pick a team and player from that team at startup
	useEffect(() => {
		const populateSamplePlayer = async () => {
			console.log('populating')
			try {
				const randomPlayer = await getRandomPlayer()

				if (randomPlayer) {
					setPlayer(randomPlayer.player)
					setTeamId(randomPlayer.teamId)
				}
			} catch (e) {
				console.error(e, 'error populating sample player')
			}
		}

		populateSamplePlayer()
	}, [])

	// TODO: yeah, fix this
	const what = () => {
		if (loading) {
			return <CircularProgress />
		}

		if (player) {
			return <JerseyLookupDisplay {...player} />
		}
	}

	return (
		<Box
			display='flex'
			flexDirection='column'
			sx={{ border: '1px solid orange', p: 2 }}
		>
			{ what() }

			<JerseyLookupBottomBar
				teams={teams}
				teamId={teamId}
				setTeamId={setTeamId}
				onPlayerSearch={onPlayerSearch}
			/>
		</Box>
	)
}
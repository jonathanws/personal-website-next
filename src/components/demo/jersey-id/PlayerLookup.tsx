/**
 * First component after the main project/jersey-id page
 */
import Box from '@mui/material/Box'
import { blueGrey } from '@mui/material/colors'
import Paper from '@mui/material/Paper'
import { useEffect } from 'react'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'
import { getRandomPlayer, getTeams } from '@/services/nfl-service'
import FullScreenLoading from './FullScreenLoading'
import MySnackbar from './MySnackbar'
import PlayerHeadshot from './PlayerHeadshot'
import PlayerSearch from './PlayerSearch'
import PlayerSummary from './PlayerSummary'
import RecentPlayers from './RecentPlayers'
import TeamPicker from './TeamPicker'

// TODO: prevent phone rotation

// ensure common look and feel for each "section"
export const borderRadiusNum = 16
export const backgroundColor = blueGrey[900]

export default function PlayerLookup() {
	const [loading, setStore] = useJerseyIdContext((store) => store.loading)
	const [playerAndTeam] = useJerseyIdContext((store) => store.playerAndTeam)

	// Randomly fetch a team and player at startup
	useEffect(() => {
		const fetchData = async () => {
			try {
				setStore({ loading: true })
				const [randomPlayer, teamsData] = await Promise.all([
					getRandomPlayer(),
					getTeams(),
				])

				if (randomPlayer) {
					setStore({ playerAndTeam: randomPlayer })
				}

				if (teamsData) {
					setStore({ teams: teamsData })
				}
			} catch (e) {
				console.error('Error fetching data', e)
			} finally {
				setStore({ loading: false })
			}
		}

		fetchData()
	}, [setStore])

	return (
		<Box
			mb={4}
			borderRadius={`${borderRadiusNum}px`}
		>
			<Box position='relative'>
				{loading && <FullScreenLoading />}

				<Paper
					elevation={3}
					sx={{
						background: backgroundColor,
						borderRadius: `${borderRadiusNum}px`,
						overflow: 'hidden',
						position: 'relative', // needed for z-index
						zIndex: 3, // ensure this section is always on top
					}}
				>
					{/* All of the pictures returned are 600 (width) x 436 (height) */}
					<Box sx={{ aspectRatio: '600 / 436' }}>
						{playerAndTeam && <PlayerHeadshot playerAndTeam={playerAndTeam} />}
					</Box>

					<PlayerSummary />

					<PlayerSearch />
				</Paper>

				<TeamPicker />

				<RecentPlayers />

				<MySnackbar />
			</Box>
		</Box>
	)
}
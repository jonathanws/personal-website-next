import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import ShuffleRounded from '@mui/icons-material/ShuffleRounded'
import { AlertColor } from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useMemo } from 'react'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'
import { getPlayerByTeamIdAndJersey, getRandomPlayer, NFLAthleteAndNFLTeam } from '@/services/nfl-service'
import NumericInput from './NumericInput'

const PLACEHOLDER_IMG = 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/nfl.png'

export default function PlayerSearch() {
	const [showTeamPicker, setStore] = useJerseyIdContext((store) => store.showTeamPicker)
	const [teams] = useJerseyIdContext((store) => store.teams)

	// fields that eventually go to the backend
	const [teamIdForQuery] = useJerseyIdContext((store) => store.teamIdForQuery)
	const [jerseyForQuery] = useJerseyIdContext((store) => store.jerseyForQuery)

	// Memoize the team logo displayed on the TeamPicker button to prevent re-renders
	const selectedTeamLogo = useMemo(
		() => teams.find(({ id }) => id === teamIdForQuery)?.logo || PLACEHOLDER_IMG,
		[teamIdForQuery, teams]
	)

	const teamImgSize = 40

	// used for showing errors / notifying of missing fields
	const popSnackbar = (text: string, severity: AlertColor) => {
		setStore({
			snackbar: {
				open: true,
				severity,
				text,
			},
		})
	}

	/**
	 * Recent Players
	 */

	const [recentPlayers] = useJerseyIdContext((store) => store.recentPlayers)

	const addRecentPlayer = (newguy: NFLAthleteAndNFLTeam) => {
		// don't add players already in the list
		if (recentPlayers.some(({ player, team }) => player.id === newguy.player.id && team.id === newguy.team.id)) {
			return
		}

		// TODO: change this on different screen sizes?
		const MAX_RECENT_PLAYERS = 4 // does not include zero

		setStore({
			recentPlayers: [
				...(recentPlayers.slice((MAX_RECENT_PLAYERS - 1) * -1)),
				newguy,
			],
		})
	}

	const fetchData = async ({ call, onError }: { call: () => Promise<NFLAthleteAndNFLTeam | undefined>, onError: () => void }) => {
		try {
			setStore({ loading: true })
			const playerAndTeam = await call()

			if (playerAndTeam) {
				setStore({ playerAndTeam })
				addRecentPlayer(playerAndTeam)
			}

			return playerAndTeam
		} catch (e) {
			console.error('Error fetching player', e)
			onError()
		} finally {
			setStore({ loading: false })
		}
	}

	const searchForRandomPlayer = async () => {
		const data = await fetchData({
			call: () => getRandomPlayer(),
			onError: () => popSnackbar('Error getting random player', 'error'),
		})

		if (!data) {
			popSnackbar('Could not load random player', 'error')
		}
	}

	const searchForPlayer = async () => {
		if (!teamIdForQuery) {
			popSnackbar('Pick a team to search', 'warning')

			return
		}

		if (!jerseyForQuery) {
			popSnackbar('Enter a jersey number to search', 'warning')

			return
		}

		const data = await fetchData({
			call: () => getPlayerByTeamIdAndJersey(teamIdForQuery, jerseyForQuery),
			onError: () => popSnackbar('Error searching for player', 'error'),
		})

		if (!data) {
			popSnackbar('Player not found', 'info')
		}
	}

	return (
		<Stack
			direction='row'
			gap={1}
			mx={1}
			p={1}
		>
			{/* TeamPicker toggle button */}
			<Button
				color='inherit'
				sx={{ gap: 1 }}
				onClick={() => setStore({ showTeamPicker: !showTeamPicker })}
			>
				<ExpandMoreIcon
					sx={{
						fontSize: '2rem',
						transform: showTeamPicker ? `rotate(${180}deg)` : `rotate(${0}deg)`,
						transition: 'transform 0.2s ease-in-out',
					}}
				/>

				<Box
					component='img'
					src={selectedTeamLogo}
					sx={{
						height: teamImgSize,
						width: teamImgSize,
					}}
				/>
			</Button>

			<NumericInput
				onChange={(newJersey) => {
					// remove leading zeroes, but allow query for '0'
					setStore({
						jerseyForQuery: newJersey.startsWith('0') && newJersey.length === 2
							? newJersey.slice(1)
							: newJersey,
					})
				}}
				onEnter={() => searchForPlayer()}
				value={jerseyForQuery}
				sx={{ flexGrow: 1 }}
			/>

			<Button
				onClick={() => searchForPlayer()}
				size='large'
				color='inherit'
			>
				<SearchIcon sx={{ fontSize: '2rem' }} />
			</Button>

			<Button
				onClick={() => searchForRandomPlayer()}
				size='large'
				color='inherit'
			>
				<ShuffleRounded sx={{ fontSize: '2rem' }} />
			</Button>
		</Stack>
	)
}
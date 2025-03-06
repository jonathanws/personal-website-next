/**
 * First component after the main project/jersey-id page
 */
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { getPlayerByTeamIdAndJersey, getRandomPlayer, getTeams, NFLAthleteAndNFLTeam, NFLTeam } from '@/services/nfl-service'
import PlayerHeadshot from './PlayerHeadshot'
import PlayerSearch from './PlayerSearch'
import PlayerSummary from './PlayerSummary'
import RecentPlayers from './RecentPlayers'
import TeamPicker from './TeamPicker'

export default function PlayerLookup() {
	const backgroundColor = useTheme().palette.background.paper

	const [playerAndTeam, setPlayerAndTeam] = useState<NFLAthleteAndNFLTeam>()
	const [teams, setTeams] = useState<NFLTeam[]>([])

	// fields that eventually go to the backend
	const [teamIdForQuery, setTeamIdForQuery] = useState('')
	const [jerseyForQuery, setJerseyForQuery] = useState('')

	// Randomly fetch a team and player at startup
	useEffect(() => {
		const populateSamplePlayer = async () => {
			try {
				const randomPlayer = await getRandomPlayer()

				if (randomPlayer) {
					setPlayerAndTeam(randomPlayer)
				}
			} catch (e) {
				console.error('error populating random player', e)
			}
		}

		const populateTeams = async () => {
			try {
				const _teams = await getTeams()

				if (_teams) {
					setTeams(_teams)
				}
			} catch (e) {
				console.error('Error fetching teams', e)
			}
		}

		populateSamplePlayer()
		populateTeams()
	}, [])

	const onPlayerSearch = async () => {
		try {
			const data = await getPlayerByTeamIdAndJersey(teamIdForQuery, jerseyForQuery)

			if (!data) {
				return
			}

			setPlayerAndTeam(data)
			addRecentPlayer(data)
		} catch (e) {
			console.error('error searching for player', e)
		}
	}

	/**
	 * Fields for user making their selection
	 */

	const [showTeamPicker, setShowTeamPicker] = useState(false)

	const onJerseyPicked = (jersey: string) => setJerseyForQuery(jersey)
	const onTeamPicked = (id: string) => {
		setTeamIdForQuery(id)
		toggleShowTeamPicker()
	}
	const toggleShowTeamPicker = () => setShowTeamPicker(!showTeamPicker)

	/**
	 * Recent Players
	 */

	const [recentPlayers, setRecentPlayers] = useState<NFLAthleteAndNFLTeam[]>([])

	const addRecentPlayer = (newguy: NFLAthleteAndNFLTeam) => {
		// don't add players already in the list
		if (recentPlayers.some(({ player, team }) => player.id === newguy.player.id && team.id === newguy.team.id )) {
			return
		}

		const MAX_RECENT_PLAYERS = 4 // does not include zero

		if (recentPlayers.length === MAX_RECENT_PLAYERS) {
			setRecentPlayers(recentPlayers.slice(1)) // remove first element
		}

		setRecentPlayers((old) => [...old, newguy])
	}

	const onRecentPlayerClick = (index: number) => setPlayerAndTeam(recentPlayers[index])

	return (
		<Box
			display='flex'
			flexDirection='column'
			sx={{ background: backgroundColor }}
		>
			{playerAndTeam && <PlayerHeadshot
				src={playerAndTeam.player.headshot.href}
				fadeTo={backgroundColor}
			/>}

			<Box pl={2} pr={2}>
				{playerAndTeam && <PlayerSummary
					height={playerAndTeam.player.displayHeight}
					jersey={playerAndTeam.player.jersey}
					name={playerAndTeam.player.fullName}
					position={playerAndTeam.player.position.name}
					weight={playerAndTeam.player.displayWeight}
				/>}
			</Box>

			<PlayerSearch
				input={jerseyForQuery}
				onSearch={onPlayerSearch}
				onJerseyChange={onJerseyPicked}
				onTeamPickerClick={toggleShowTeamPicker}
				teamLogo={teams.find(({ id }) => id === teamIdForQuery)?.logo}
			/>

			<TeamPicker
				onSelect={onTeamPicked}
				open={showTeamPicker}
				selectedTeamId={teamIdForQuery}
				teams={teams}
			/>

			<RecentPlayers
				onRecentPlayerClick={onRecentPlayerClick}
				recentPlayers={recentPlayers}
			/>
		</Box>
	)
}
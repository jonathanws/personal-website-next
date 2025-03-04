import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { NFLTeam } from '@/services/nfl-service'
import TeamPicker from './TeamPicker'

interface Props {
	teams: NFLTeam[]
	teamId: string
	setTeamId: (a: string) => void
	onPlayerSearch: (teamId: string, jerseyNumber: string) => void
}

export default function JerseyLookupBottomBar({ setTeamId, teamId, teams, onPlayerSearch }: Props) {
	const [jerseyNumber, setJerseyNumber] = useState('')
	// const [teamId, setTeamId] = useState('1')

	const onSubmit = () => {
		// TODO: delete
		console.log('hmmm', jerseyNumber)
		onPlayerSearch(teamId, jerseyNumber)
	}
	const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		// ensure numbers <100
		target.value = `${target.value}`.slice(0, 2)
		setJerseyNumber(target.value)
	}
	const onTeamChange = (selectedTeamId: string) => {
		console.log('parent is aware', selectedTeamId)
		setTeamId(selectedTeamId)
	}
	const onKeyDown = ({ key }: React.KeyboardEvent) => {
		if (key === 'Enter') {
			onSubmit()
		}
	}

	return (
		<Box
			display='flex'
			alignItems='center'
			sx={{
				border: '1px solid red',
				gap: 3,
				p: 2,
			}}
		>
			{
				teamId &&
				<TeamPicker
					teamId={teamId}
					teams={teams}
					onTeamChange={onTeamChange}
				/>
			}

			<TextField
				placeholder='jersey'
				type='tel'
				onChange={onInputChange}
				onSubmit={onSubmit}
				onKeyDown={onKeyDown}
				autoComplete='off'
				sx={{
					flexGrow: 1,
					input: { textAlign: 'center' },
				}}
			/>

			<IconButton
				onClick={onSubmit}
				sx={{
					border: '1px solid pink',
					borderRadius: 3,
				}}>
				<SearchIcon />
			</IconButton>
		</Box>
	)
}
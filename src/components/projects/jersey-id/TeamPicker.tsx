import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import { useState } from 'react'
import { NFLTeam } from '@/services/nfl-service'

interface Props {
	teamId: string
	teams: NFLTeam[]
	onTeamChange: (a: string) => void
}

export default function TeamPicker({ teamId, teams, onTeamChange }: Props) {
	const [selectedTeamId, setSelectedTeamId] = useState(teamId)
	const imgSize = 35

	const onTeamPicked = (teamId: string) => {
		setSelectedTeamId(teamId)
		onTeamChange(teamId)
		setAnchorEl(null)
	}

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
	const openPopover = Boolean(anchorEl)
	const id = openPopover ? 'simple-popover' : undefined

	/**
	 * Individual items in the popover
	 */
	const getTeamGridItem = (id: string, logo: string) => <Box
		key={`team-logo${id}`}
		display='flex'
		alignItems='center'
		onClick={() => onTeamPicked(id)}
		sx={{
			'&:hover': { background: 'gray' },
			border: id === selectedTeamId ? '2px solid white' : '2px solid transparent',
			borderRadius: 2,
		}}
	>
		<Box
			component='img'
			sx={{
				height: imgSize,
				margin: 1,
				width: imgSize,
			}}
			src={logo}
		/>
	</Box>

	return (
		<Box>
			<Button
				aria-describedby={id}
				variant='outlined'
				onClick={(e) => setAnchorEl(e.currentTarget)}
			>
				<Box
					component='img'
					src={teams.find(({ id }) => selectedTeamId === id)?.logo ?? ''}
					sx={{
						height: imgSize,
						width: imgSize,
					}}
				/>
			</Button>

			<Popover
				id={id}
				open={openPopover}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{
					horizontal: 'left',
					vertical: 'top',
				}}
				transformOrigin={{
					horizontal: 'left',
					vertical: 'bottom',
				}}
				slotProps={{
					paper: {
						sx: {
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'flex-start',
							// maxWidth: anchorEl ? 'calc(100% - 60px)' : 'auto',
							maxWidth: '500px',
							p: 2,
						},
					},
				}}
			>
				{ teams.map(({ id, logo }) => getTeamGridItem(id, logo)) }
			</Popover>
		</Box>
	)
}
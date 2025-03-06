import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import { NFLTeam } from '@/services/nfl-service'
import TeamPickerGridItem from './TeamPickerGridItem'

interface Props {
	onSelect: (id: string) => void
	open: boolean
	selectedTeamId: string
	teams: NFLTeam[]
}

export default function TeamPicker({ onSelect, open, selectedTeamId, teams }: Props) {
	const onTeamPickerGridItemClicked = (id: string) => onSelect(id)

	return (
		<Collapse
			in={open}
			timeout='auto'
			unmountOnExit
		>
			<Paper
				elevation={3}
				sx={{
					mt: 2,
					p: 2,
				}}
			>
				<Box
					display='flex'
					flexWrap='wrap'
					justifyContent='flex-start'
				>
					{
						teams.map(({ id, logo }) => <TeamPickerGridItem
							key={`team-logo${id}`}
							focus={id === selectedTeamId}
							id={id}
							logo={logo}
							onClick={() => onTeamPickerGridItemClicked(id)}
						/>)
					}
				</Box>
			</Paper>
		</Collapse>
	)
}
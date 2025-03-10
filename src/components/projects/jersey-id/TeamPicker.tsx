import Box from '@mui/material/Box'
import { NFLTeam } from '@/services/nfl-service'
import CollapsableOverlapPaper from './CollapsableOverlapPaper'
import { borderRadiusNum } from './PlayerLookup'
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
		<CollapsableOverlapPaper
			background='green'
			borderRadius={borderRadiusNum}
			open={open}
			zIndex={2}
		>
			<Box
				display='inline-flex'
				flexWrap='wrap'
				justifyContent='center'
				margin='auto'
			>
				{
					teams.map(({ displayName, id, logo }) => <TeamPickerGridItem
						key={`team-logo${id}`}
						displayName={displayName}
						focus={id === selectedTeamId}
						id={id}
						logo={logo}
						onClick={() => onTeamPickerGridItemClicked(id)}
					/>)
				}
			</Box>
		</CollapsableOverlapPaper>
	)
}
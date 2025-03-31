import Box from '@mui/material/Box'
import { blueGrey } from '@mui/material/colors'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'
import CollapsableOverlapPaper from './CollapsableOverlapPaper'
import { borderRadiusNum } from './PlayerLookup'
import TeamPickerGridItem from './TeamPickerGridItem'

export default function TeamPicker() {
	const [showTeamPicker] = useJerseyIdContext((store) => store.showTeamPicker)
	const [teamIdForQuery] = useJerseyIdContext((store) => store.teamIdForQuery)
	const [teams] = useJerseyIdContext((store) => store.teams)

	return (
		<CollapsableOverlapPaper
			elevation={3}
			background={blueGrey[700]}
			borderRadius={borderRadiusNum}
			open={showTeamPicker && teams.length > 0}
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
						focus={id === teamIdForQuery}
						id={id}
						logo={logo}
					/>)
				}
			</Box>
		</CollapsableOverlapPaper>
	)
}
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import { NFLTeam } from '@/services/nfl-service'
import { sectionBorderRadius } from './PlayerLookup'
import TeamPickerGridItem from './TeamPickerGridItem'

interface Props {
	onSelect: (id: string) => void
	open: boolean
	selectedTeamId: string
	teams: NFLTeam[]
}

export default function TeamPicker({ onSelect, open, selectedTeamId, teams }: Props) {
	const theme = useTheme()
	const p = 2

	const onTeamPickerGridItemClicked = (id: string) => onSelect(id)


	return (
		<Collapse
			in={open}
			timeout='auto'
			sx={{
				background: 'tomato',
				position: 'relative',
				zIndex: 2,
			}}
		>
			<Paper className='herrrrrrrrrrrrrrrrre'
				elevation={2}
				sx={{
					borderBottomLeftRadius: sectionBorderRadius,
  					borderBottomRightRadius: sectionBorderRadius,
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
					display: 'flex',
					justifyContent: 'center',
					mt: `-${sectionBorderRadius}`,
					p,
					pt: `calc(${theme.spacing(p)} + 8px)`,
				}}
			>
				<Box
					display='inline-flex'
					flexWrap='wrap'
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
			</Paper>
		</Collapse>
	)
}
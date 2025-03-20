import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ExpandButtonToggle from './ExpandButtonToggle'
import { CollapsableArea, ReactLine } from './json'

interface Props {
	collapsableAreas: CollapsableArea[]
	onCollapsableAreaClick: (a: CollapsableArea) => void
	reactLines: ReactLine[]
	showNumbers: boolean
}

export default function JsonInspectorSidebar({ collapsableAreas, onCollapsableAreaClick, reactLines, showNumbers }: Props) {
	const transitionSpeed = 0.1

	const onToggle = (area: CollapsableArea) => {
		onCollapsableAreaClick(area)
	}

	return (
		<Stack direction='row'>
			{/* line numbers column */}
			<Box
				display='block'
				overflow='hidden'
				pr={showNumbers ? 1 : 0}
				width={showNumbers ? '20px' : 0}
				sx={{
					transition: [
						`width ${transitionSpeed}s ease-in-out`,
						`padding-right ${transitionSpeed}s ease-in-out`,
					].join(', '),
				}}
			>
				{Array.from(Array(reactLines.length)).map((_, index) => <Typography key={index} height='22px'>{index + 1}</Typography>)}
			</Box>

			{/* collapsable buttons column */}
			<Box display='flex' flexDirection='column'>
				{
					reactLines.map((lines, i) => {
						const area = collapsableAreas.find((a) => i === a.lineStart)

						return area
							? <ExpandButtonToggle key={i} expanded={area.expanded} onToggle={() => onToggle(area)} />
							: <Box key={i} height='22px' />
					})
				}
			</Box>
		</Stack>
	)
}
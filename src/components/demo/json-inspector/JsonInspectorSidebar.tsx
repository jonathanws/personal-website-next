import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ExpandButtonToggle from './ExpandButtonToggle'
import { useJsonContext } from './JsonContext'

export default function JsonInspectorSidebar() {
	const [areas] = useJsonContext((store) => store.areas)
	const [showLineNumbers, setStore] = useJsonContext((store) => store.showLineNumbers)
	const [tokenLines] = useJsonContext((store) => store.tokenLines)
	const transitionSpeed = 0.1

	// const onToggle = (area: CollapsableArea) => {
	// 	onCollapsableAreaClick(area)
	// }

	return (
		<Stack direction='row'>
			{/* line numbers column */}
			<Box
				display='block' // TODO: ?
				overflow='hidden'
				pr={showLineNumbers ? 1 : 0}
				width={showLineNumbers ? '20px' : 0}
				sx={{
					transition: [
						`width ${transitionSpeed}s ease-in-out`,
						`padding-right ${transitionSpeed}s ease-in-out`,
					].join(', '),
				}}
			>
				{Array.from(Array(tokenLines.length)).map((_, index) =>
					<Typography key={index} height='22px' >{index + 1}</Typography>
				)}
			</Box>

			{/* collapsable buttons column */}
			<Box overflow='hidden'>
				{
					tokenLines.map((lines, i) => {
						const area = areas.find((a) => i === a.lineStart)

						return area
							? <ExpandButtonToggle
								key={i}
								expanded={area.expanded}
								onToggle={() => {
									console.log('toggle', area.expanded)

									return area.expanded = !area.expanded
								}}
							/>
							: <Box key={i} height='22px' />
					})
				}
			</Box>
		</Stack>
	)
}
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ExpandButtonToggle from './ExpandButtonToggle'
import { ReactLine } from './json'

interface Props {
	reactLines: ReactLine[]
	showNumbers: boolean
}

export default function JsonInspectorSidebar({ reactLines, showNumbers }: Props) {
	const transitionSpeed = 0.1

	const onToggle = (index: number) => {
		console.log('toggle', index)
	}

	// Show buttons if there is an open bracket, but only if there isn't a closing bracket on the same line
	const shouldShowExpandButton = (segments: ReactLine) => {
		const hasOpenCurly = segments.some(({ text, type }) => {
			return type === 'curly' && text === '{'
		})

		if (hasOpenCurly) {
			const hasClosedCurly = segments.some(({ text, type }) => {
				return type === 'curly' && text === '}'
			})

			return hasOpenCurly && !hasClosedCurly
		}

		const hasOpenSquare = segments.some(({ text, type }) => {
			return type === 'square' && text === '['
		})

		if (hasOpenSquare) {
			const hasClosedSquare = segments.some(({ text, type }) => {
				return type === 'square' && text === ']'
			})

			return hasOpenSquare && !hasClosedSquare
		}

		return false
	}

	return (
		<Stack direction='row'>
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

			<Box display='flex' flexDirection='column'>
				{reactLines.map((segments, i) => shouldShowExpandButton(segments)
					? <ExpandButtonToggle key={i} onToggle={() => onToggle(i)} />
					: <Box key={i} height='22px' />
				)}
			</Box>
		</Stack>
	)
}
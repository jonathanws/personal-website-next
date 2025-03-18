import Box from '@mui/material/Box'
import { ReactLine } from './json'
import PrintLineSegment from './PrintLineSegment'
import PrintMeta from './PrintMeta'
import PrintWhitespace from './PrintWhitespace'
import { getStylesFor, getThemeTypeFromReactType, Settings } from './services/settings'

interface Props {
	reactLines: ReactLine[]
	settings: Settings
	level: number
}

export default function JsonSection({ reactLines, settings }: Props) {
	const LineSegment = ({ segment: { text, type }, key }: { key: string, segment: ReactLine[number] }) => {
		if (type === 'meta') {
			return <PrintMeta
				key={key}
				settings={settings}
			>
				{text}
			</PrintMeta>
		}

		if (type === 'whitespace') {
			return <PrintWhitespace
				key={key}
				settings={settings}
			>
				{text}
			</PrintWhitespace>
		}

		return <PrintLineSegment
			key={key}
			settings={settings}
			sxProps={getStylesFor(getThemeTypeFromReactType(type), settings)}
		>
			{text}
		</PrintLineSegment>
	}

	return (
		<>
			{
				reactLines.map((line, lineIndex) =>
					<Box
						key={lineIndex}
						sx={{ lineHeight: 1 }}
					>
						{
							line.map((segment, segmentIndex) => <LineSegment
								segment={segment}
								key={`${lineIndex}_${segmentIndex}`}
							/>)
						}
				</Box>
			)}
		</>
	)
}
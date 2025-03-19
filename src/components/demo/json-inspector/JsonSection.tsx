import Box from '@mui/material/Box'
import { ReactLine, ReactToken } from './json'
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
	const LineSegment = ({ text, type }: Pick<ReactToken, 'text' | 'type'>) => {
		if (type === 'meta') {
			return <PrintMeta settings={settings}>{text}</PrintMeta>
		}

		if (type === 'whitespace') {
			return <PrintWhitespace settings={settings}>{text}</PrintWhitespace>
		}

		return <PrintLineSegment sxProps={getStylesFor(getThemeTypeFromReactType(type), settings)}>{text}</PrintLineSegment>
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
							line.map(({ text, type }, segmentIndex) => <LineSegment
								key={`${lineIndex}_${segmentIndex}`}
								text={text}
								type={type}
							/>)
						}
					</Box>
				)
			}
		</>
	)
}
import Box from '@mui/material/Box'
import { ReactLine } from './json'
import PrintLineSegment from './PrintLineSegment'
import PrintMeta from './PrintMeta'
import PrintWhitespace from './PrintWhitespace'
import { getStylesFor, getThemeTypeFromReactType, Settings } from './services/settings'

interface ReactLineContainerProps {
	focus: boolean
	line: ReactLine
	settings: Settings
}

export default function ReactLineContainer({ focus = false, line, settings }: ReactLineContainerProps) {
	return (
		<Box
			lineHeight={1}
			sx={{
				...(focus && {
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					borderRadius: 1,
				}),
			}}
		>
			{
				line.map(({ text, type }, key) => {
					switch (type) {
						case 'meta':
							return <PrintMeta key={key} settings={settings}>{`${text}${focus ? ' ...' : ''}`}</PrintMeta>
						case 'whitespace':
							return <PrintWhitespace key={key} settings={settings}>{text}</PrintWhitespace>
						default:
							return <PrintLineSegment key={key} sxProps={getStylesFor(getThemeTypeFromReactType(type), settings)}>{text}</PrintLineSegment>
					}
				})
			}
			{
				// we only add meta tokens after '['s, so account for the lines that fold without a meta token to edit
				focus && !line.some(({ type }) => type === 'meta') &&
				<PrintMeta settings={settings}>{'...'}</PrintMeta>
			}
		</Box>
	)
}
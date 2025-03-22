import Box from '@mui/material/Box'
import { ReactLine } from './json'
import { useJsonContext } from './JsonContext'
import PrintLineSegment from './PrintLineSegment'
import PrintMeta from './PrintMeta'
import PrintWhitespace from './PrintWhitespace'
import { getStylesFor, getThemeTypeFromReactType } from './services/settings'

interface ReactLineContainerProps {
	focus: boolean
	line: ReactLine
}

export default function ReactLineContainer({ focus = false, line }: ReactLineContainerProps) {
	const [theme] = useJsonContext((store) => store.theme)

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
							return <PrintMeta key={key}>{`${text}${focus ? ' ...' : ''}`}</PrintMeta>
						case 'whitespace':
							// console.log('')
							// console.log('whitespace token', { text, type })
							return <PrintWhitespace key={key}>{text}</PrintWhitespace>
						default:
							return <PrintLineSegment key={key} sxProps={getStylesFor(getThemeTypeFromReactType(type), theme)}>{text}</PrintLineSegment>
					}
				})
			}
			{
				// we only add meta tokens after '['s, so account for the lines that fold without a meta token to edit
				focus && !line.some(({ type }) => type === 'meta') &&
				<PrintMeta>{'...'}</PrintMeta>
			}
		</Box>
	)
}
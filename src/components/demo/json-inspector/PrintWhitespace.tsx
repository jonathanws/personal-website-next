import { grey } from '@mui/material/colors'
import { alpha } from '@mui/material/styles'
import PrintLineSegment from './PrintLineSegment'
import { Settings } from './services/settings'

interface Props {
	children: string
	settings: Settings
}

export default function PrintWhitespace({ children, settings }: Props) {
	return (
		<>
			{
				children.split('')
					.map((child, index) => <PrintLineSegment
						key={index}
						sxProps={{
							position: 'relative',
							tabSize: `${settings.formatting.indentRhythm}`, // keep value as string since MUI converts to theme multiplier
							whiteSpace: 'pre-wrap',
							...(settings.renderWhitespace && {
								'&::before': {
									color: alpha(grey[300], 0.1),
									content: `"${child === ' '
										? '·'
										: child === '	'
											? '→'
											: 'x'
									}"`,
									lineHeight: '19px',
									mixBlendMode: 'difference',
									pointerEvents: 'none',
									position: 'absolute',
									userSelect: 'none',
								},
							}),
						}}
					>
						{child}
					</PrintLineSegment>)
			}
		</>
	)
}
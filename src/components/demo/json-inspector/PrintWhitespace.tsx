import { grey } from '@mui/material/colors'
import { alpha } from '@mui/material/styles'
import { ComponentProps } from 'react'
import { useJsonContext } from './JsonContext'
import PrintLineSegment from './PrintLineSegment'

interface Props {
	children: string
}

// helper component
const BaseWhitespace = ({ children, content, sxProps }: { children: React.ReactNode, content: string, sxProps?: ComponentProps<typeof PrintLineSegment>['sxProps'] }) => {
	const [renderWhitespace] = useJsonContext((store) => store.renderWhitespace)

	return (
		<PrintLineSegment sxProps={{
			position: 'relative',
			whiteSpace: 'pre-wrap',
			...sxProps,
			...(renderWhitespace && {
				'&::before': {
					color: alpha(grey[300], 0.1),
					lineHeight: '19px',
					mixBlendMode: 'difference',
					pointerEvents: 'none',
					position: 'absolute',
					userSelect: 'none',
					content,
				}
			})
		}}>
			{children}
		</PrintLineSegment>
	)
}

export default function PrintWhitespace({ children }: Props) {
	const [indentCharacter] = useJsonContext((store) => store.formatting.indentCharacter)
	const [indentRhythm] = useJsonContext((store) => store.formatting.indentRhythm)

	// for tabs we split the incoming multi-tabs string purely so that the tab whitespace characters line up with the width of "tabSize".
	// If we displayed everything in one div, the arrows squish together, and don't line up.  Spaces are fine to display in one element.
	
	return indentCharacter === '\t'
		? children.split('')
			.map((child, index) => <BaseWhitespace
				key={index}
				content={`"${children.replace('\t', '→')}"`}
				sxProps={{ tabSize: `${indentRhythm}` }} // keep value as string since MUI converts to theme multiplier
			>
				{child}
			</BaseWhitespace>
		)
		: <BaseWhitespace content={`"${children.replaceAll(' ', '·')}"`}>{children}</BaseWhitespace>
}



























// function PrintWhitespace({ children }: Props) {
// 	const [formatting] = useJsonContext((store) => store.formatting)
// 	const [renderWhitespace] = useJsonContext((store) => store.renderWhitespace)

// 	const renderWhitespaceStyles = {
// 		'&::before': {
// 			color: alpha(grey[300], 0.1),
// 			content: `"${formatting.indentCharacter === '\t'
// 				? children.replaceAll('\t', '→')
// 				: children.replaceAll('\t', '·')
// 			}"`,
// 			// content: `"${content()}"`,
// 			lineHeight: '19px',
// 			mixBlendMode: 'difference',
// 			pointerEvents: 'none',
// 			position: 'absolute',
// 			userSelect: 'none',
// 		},
// 	}

// 	// we split the string here purely so that the tab characters line up with the width of "tabSize"
// 	// If we displayed everything in one div, the arrows squish together, and don't line up.

// 	return children
// 		.split('')
// 		.map((child, index) => <PrintLineSegment
// 			key={index}
// 			sxProps={{
// 				position: 'relative',
// 				tabSize: `calc(${formatting.indentRhythm} * 1ch)`, // using calc since literal values aren't being respected in firefox,
// 				whiteSpace: 'pre',
// 				...(renderWhitespace && renderWhitespaceStyles),
// 			}}
// 		>
// 			{child}
// 		</PrintLineSegment>)
// }
// export default PrintWhitespace
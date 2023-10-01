import { lighten } from '@mui/material/styles'
import { BG_ALT } from '@/services/theming'

interface Props {
	children: string
}

// format text to appear as inline monospace font
export default function BlogInlineCode({ children }: Props) {
	const paddingY = 3
	const paddingX = 6

	return <code
		style={{
			backgroundColor: lighten(BG_ALT, 0.1),
			borderRadius: 4,
			fontSize: 16,
			paddingBottom: paddingY,
			paddingLeft: paddingX,
			paddingRight: paddingX,
			paddingTop: paddingY,
			whiteSpace: 'nowrap',
		}}
	>
		{children}
	</code>
}
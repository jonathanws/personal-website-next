import { grey } from '@mui/material/colors'
import { alpha } from '@mui/material/styles'
import { useJsonContext } from './JsonContext'
import PrintLineSegment from './PrintLineSegment'

interface Props {
	children?: string
}

export default function PrintMeta({ children }: Props) {
	const [showMetaText] = useJsonContext((store) => store.showMetaText)

	return (
		<PrintLineSegment sxProps={{
			...(children && showMetaText && {
				'&::after': {
					color: alpha(grey[500], 0.5),
					content: `" ${children}"`,
					fontStyle: 'italic',
				},
				color: grey[500],
			}),
		}} />
	)
}
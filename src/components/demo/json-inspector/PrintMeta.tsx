import { grey } from '@mui/material/colors'
import { alpha } from '@mui/material/styles'
import PrintLineSegment from './PrintLineSegment'
import { Settings } from './services/settings'

interface Props {
	children?: string
	settings: Settings
}

export default function PrintMeta({ children, settings }: Props) {
	return (
		<PrintLineSegment
			settings={settings}
			sxProps={{
				...(children && settings.showMetaText && {
					color: grey[500],
					'&::after': {
						color: alpha(grey[500], 0.5),
						content: `" ${children}"`,
						fontStyle: 'italic',
					}
				}),
			}}
		/>
	)
}
import Stack from '@mui/material/Stack'
import PasteJson from './PasteJson'
import ResetSettings from './ResetSettings'
import ShowExample from './ShowExample'

export default function SettingsToolbarHeader() {
	return (
		<Stack
			width='100%'
			flexDirection='row'
			gap={1}
		>
			<ResetSettings />

			<PasteJson />

			<ShowExample />
		</Stack>
	)
}
import SettingsBackupRestoreRounded from '@mui/icons-material/SettingsBackupRestoreRounded'
import Button from '@mui/material/Button'
import { useJsonContext } from '../JsonContext'
import { defaultSettings } from '../services/settings'

export default function ResetSettings() {
	const [store, setStore] = useJsonContext((store) => store)

	const isResetEnabled = () =>
		store.formatting.generateMetaTokens !== defaultSettings.formatting.generateMetaTokens
		|| store.formatting.indentCharacter !== defaultSettings.formatting.indentCharacter
		|| store.formatting.indentRhythm !== defaultSettings.formatting.indentRhythm

		|| store.renderWhitespace !== defaultSettings.renderWhitespace
		|| store.showLineNumbers !== defaultSettings.showLineNumbers
		|| store.showMetaText !== defaultSettings.showMetaText
		|| store.theme !== defaultSettings.theme
		|| store.trailingComma !== defaultSettings.trailingComma

	return (
		<Button
			variant='contained'
			startIcon={<SettingsBackupRestoreRounded />}
			disabled={!isResetEnabled}
			onClick={() => setStore(defaultSettings)}
		>
			reset
		</Button>
	)
}
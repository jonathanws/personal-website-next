import { ContentPasteRounded } from '@mui/icons-material'
import Button from '@mui/material/Button'
import { getTokenLinesAndCollapsableAreas } from '../json'
import { useJsonContext } from '../JsonContext'

export default function PasteJson() {
	const [formatting, setStore] = useJsonContext(({ formatting }) => formatting)

	return (
		<Button
			variant='contained'
			startIcon={<ContentPasteRounded />}
			onClick={async () => {
				try {
					const payload = await navigator.clipboard.readText()

					if (!payload) {
						return
					}

					// TODO: when I have a previous input with a folded area and paste a new one, do I need to
					// set all of the new areas expanded: true ?

					setStore({ ...(getTokenLinesAndCollapsableAreas(payload, formatting)) })
				} catch (e) {
					// TODO: need to verify what to do if user denies permission
					console.error('error readding from clipboard', e)
				}
			}}
		>
			paste
		</Button>
	)
}
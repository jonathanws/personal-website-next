import Alert from '@mui/material/Alert'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'

export default function MySnackbar() {
	const [snackbar, setStore] = useJerseyIdContext((store) => store.snackbar)
	const theme = useTheme()

	// display at bottom on phones, top-right on everything else
	const snackbarPosition: SnackbarProps['anchorOrigin'] = useMediaQuery(theme.breakpoints.up('md'))
		? { horizontal: 'right', vertical: 'top' }
		: { horizontal: 'center', vertical: 'bottom' }

	return (
		<Snackbar
			anchorOrigin={snackbarPosition}
			autoHideDuration={3_000}
			onClose={() => {
				setStore({
					snackbar: {
						...snackbar,
						open: false,
					},
				})
			}}
			open={snackbar.open}
		>
			<Alert
				severity={snackbar.severity}
				variant='filled'
			>
				{snackbar.text}
			</Alert>
		</Snackbar>
	)
}
import Alert, { AlertColor } from '@mui/material/Alert'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
	children: string
	onClose: () => void
	open: boolean
	severity: AlertColor
}

export default function MySnackbar({ children, onClose, open, severity }: Props) {
	const theme = useTheme()

	// display at bottom on phones, top-right on everything else
	const snackbarPosition: SnackbarProps['anchorOrigin'] = useMediaQuery(theme.breakpoints.up('md'))
		? { horizontal: 'right', vertical: 'top' }
		: { horizontal: 'center', vertical: 'bottom' }

	return (
		<Snackbar
			anchorOrigin={snackbarPosition}
			autoHideDuration={3_000}
			onClose={onClose}
			open={open}
		>
			<Alert
				severity={severity}
				variant='filled'
			>
				{children}
			</Alert>
		</Snackbar>
	)
}
import Alert, { AlertColor } from '@mui/material/Alert'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'

interface Props {
	children: string
	onClose: () => void
	open: boolean
	severity: AlertColor
}

export default function MySnackbar({ children, onClose, open, severity }: Props) {
	const theme = useTheme()
	const [visible, setVisible] = useState(open)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(false)
			onClose()
		}, 3_000)

		if (open) {
			setVisible(true)

			return () => clearTimeout(timeout)
		}
	}, [open, onClose])

	// display at bottom on phones, top-right on everything else
	const snackbarPosition: SnackbarProps['anchorOrigin'] = useMediaQuery(theme.breakpoints.up('md'))
		? { horizontal: 'right', vertical: 'top' }
		: { horizontal: 'center', vertical: 'bottom' }

	return (
		<Snackbar
			anchorOrigin={snackbarPosition}
			onClose={onClose}
			open={visible}
		>
			<Alert
				severity={severity}
				variant="filled"
			>
				{children}
			</Alert>
		</Snackbar>
	)
}
import Alert, { AlertProps } from '@mui/material/Alert'

export default function BlogAlert(props: AlertProps) {
	const { children, ...alertProps } = props

	return (
		<Alert
			variant='outlined'
			sx={{ my: 4 }}
			{...alertProps}
		>
			{children}
		</Alert>
	)
}
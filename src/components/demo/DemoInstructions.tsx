import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

interface Props {
	title?: string
	text: string
}

export default function DemoInstructions({ title, text }: Props) {
	const [alertOpen, setAlertOpen] = useState(true)

	return <Collapse in={alertOpen}>
		<Alert
			action={
				<IconButton
					aria-label='close'
					color='inherit'
					size='small'
					onClick={() => setAlertOpen(false)}
				>
					<CloseIcon fontSize='inherit' />
				</IconButton>
			}
			severity='info'
			sx={{ mb: 2 }}
			variant='outlined'
		>
			{title && <AlertTitle>{title}</AlertTitle>}
			{text}
		</Alert>
	</Collapse>
}
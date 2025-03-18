import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'

const maxSize = '22px'

interface ExpandButtonToggleProps {
	onToggle: () => void
}

export default function ExpandButtonToggle ({ onToggle }: ExpandButtonToggleProps) {
	const [open, setOpen] = useState(true)

	const onClick = () => {
		setOpen(!open)
		onToggle()
	}

	return <IconButton
		onClick={onClick}
		sx={{
			maxHeight: maxSize,
			maxWidth: maxSize,
		}}
	>
		{open ? <ExpandMore /> : <ExpandLess />}
	</IconButton>
}
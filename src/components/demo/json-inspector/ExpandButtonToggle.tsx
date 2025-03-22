import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded'
import IconButton from '@mui/material/IconButton'

const maxSize = '22px'

interface ExpandButtonToggleProps {
	expanded: boolean
	onToggle: () => void
}

export default function ExpandButtonToggle ({ expanded, onToggle }: ExpandButtonToggleProps) {
	const sx={
		maxHeight: maxSize,
		maxWidth: maxSize,
	}

	// ExpandLess: ^ , ExpandMore: v
	const icon = expanded ? <ExpandMoreRounded /> : <ExpandLessRounded />

	return <IconButton
		onClick={onToggle}
		sx={sx}
	>
		{icon}
	</IconButton>
}
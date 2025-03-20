import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded'
import IconButton from '@mui/material/IconButton'

const maxSize = '22px'

interface ExpandButtonToggleProps {
	expanded: boolean
	onToggle: () => void
}

export default function ExpandButtonToggle ({ expanded, onToggle }: ExpandButtonToggleProps) {
	return <IconButton
		onClick={onToggle}
		sx={{
			maxHeight: maxSize,
			maxWidth: maxSize,
		}}
	>
		{expanded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
	</IconButton>
}
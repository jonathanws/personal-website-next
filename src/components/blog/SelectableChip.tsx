import { BlogPostTag } from '@/services/blogPosts'
import Chip from '@mui/material/Chip'

interface Props {
	index: number
	label: BlogPostTag
	onClick: (index: number) => void,
	selected: boolean
}

export default function BlogSelectableChip({ index, label, onClick, selected }: Props) {
	return (
		<Chip
			label={label}
			color='primary'
			onClick={() => onClick(index)}
			variant={selected ? 'filled' : 'outlined'}
			sx={{
				fontWeight: 600,
				...(selected ? { border: '1px solid transparent' } : null),
			}}
		/>
	)
}
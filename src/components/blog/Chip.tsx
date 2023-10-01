import Chip, { ChipTypeMap } from '@mui/material/Chip'
import { blue } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import { BlogPostTag } from '@/services/blogPosts'

interface Props {
	type: BlogPostTag
}

export default function BlogChip({ type }: Props) {
	const theme = useTheme()
	const padding = 4
	const backgroundColor = theme.palette.mode === 'dark'
		? blue[900]
		: blue[300]

	let label: ChipTypeMap['props']['label']

	switch (type) {
		case 'typescript':
			label = 'Typescript'
			break
		case 'git':
			label = 'Git'
			break
	}

	return <Chip
		label={label}
		color='primary'
		variant='filled'
		style={{
			backgroundColor,
			fontWeight: 600,
			paddingLeft: padding,
			paddingRight: padding,
		}}
	/>
}
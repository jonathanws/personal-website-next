import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

interface Props {
	list: any[]
}

export default function BlogBulletList ({ list }: Props) {
	const paddingY = 0.5
	const paddingX = 2

	return (
		<List sx={{
			listStyleType: 'disc',
			pb: 0,
			pl: 4,
			pt: 0,
		}}>
			{list.map((l, i) => (
				<ListItem
					key={i}
					sx={{
						display: 'list-item',
						pb: paddingY,
						pl: paddingX,
						pr: paddingX,
						pt: paddingY,
					}}
				>
					{l}
				</ListItem>
			))}
		</List>
	)
}
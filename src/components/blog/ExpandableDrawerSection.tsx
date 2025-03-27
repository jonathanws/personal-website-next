import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

interface Props<Item> {
	items: Item[]
	isItemSelected: (item: Item) => boolean
	listItemIcon?: (item: Item) => React.ReactNode
	listItemText: (item: Item) => string
	onItemClick: (item: Item) => void
	title: string
}

export default function ExpandableDrawerSection<Item>({
	items,
	isItemSelected,
	listItemIcon,
	listItemText,
	onItemClick,
	title,
}: Props<Item>) {
	const listItems = items.map((item, index) => {
		const icon = listItemIcon ? listItemIcon(item) : undefined

		return (
			<ListItem key={index} disablePadding sx={{
				'&:hover .MuiListItemText-primary': {
					color: 'white',
				},
				'.Mui-selected .MuiListItemText-primary': {
					color: 'primary.light',
				},
			}}>
				<ListItemButton onClick={() => onItemClick(item)} selected={isItemSelected(item)}>
					{icon && <ListItemIcon>{icon}</ListItemIcon>}
					<ListItemText primary={listItemText(item)} />
				</ListItemButton>
			</ListItem>
		)
	})

	return (
		<>
			<Toolbar>
				<Typography variant='h6'>{title}</Typography>
			</Toolbar>

			<List>{listItems}</List>
		</>
	)
}
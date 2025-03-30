import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

interface BlogBulletListProps {
	children: React.ReactNode | React.ReactNode[]
}

const BlogBulletList = ({ children }: BlogBulletListProps) => {
	return (
		<List sx={{
			listStyleType: 'disc',
			pb: 0,
			pl: 4,
			pt: 0,
		}}>
			{children}
		</List>
	)
}

const BlogBulletListItem = ({ children }: { children:  React.ReactNode }) => {
	return (
		<ListItem sx={{
			display: 'list-item',
			px: 2,
			py: 0.5,
		}}>
			{children}
		</ListItem>
	)
}

export {
	BlogBulletList,
	BlogBulletListItem,
}
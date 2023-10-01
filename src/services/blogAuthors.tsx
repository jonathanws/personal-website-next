import Avatar from '@mui/material/Avatar'

const authors = {
	jonSmoley: {
		name: 'Jon Smoley',
		src: '/jon-hero.jpg',
		title: 'Senior Software Engineer',
	},
}

const getAuthor = (author: keyof typeof authors, size = 50) => {
	switch (author) {
		case 'jonSmoley':
		default:
			return {
				avatar: <Avatar alt={authors.jonSmoley.name} src={authors.jonSmoley.src} sx={{ height: size, width: size }} />,
				name: authors.jonSmoley.name,
				title: authors.jonSmoley.title,
			}
	}
}

export {
	authors,
	getAuthor,
}
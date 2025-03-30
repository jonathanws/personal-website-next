import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { BlogPost } from '@/services/blogPosts'
import { BG_ALT } from '@/services/theming'
import BlogArticleMeta from './ArticleMeta'
import BlogImage from './Image'

export default function BlogBody({ author, body, bodyTitle, date, heroSrc, tags }: BlogPost) {
	// sizing styles that keep everything in a nice, narrow column
	const contentContainerStyles = {
		width: {
			md: '680px',
			sm: '580px',
			xs: '100%',
		},
	}
	// the hero image however is allowed to be bigger
	const heroImageStyles = { maxWidth: '1920px' }

	return (
		<Box
			component='main'
			display='flex'
			flexDirection='column'
			alignItems='center'
			bgcolor={BG_ALT}
			maxWidth='100vw'
			p={3}
			pb={10}
			mt={8}
		>
			<Box sx={contentContainerStyles}>
				<Typography sx={{ typography: { md: 'h1', xs: 'h3' } }}>{bodyTitle}</Typography>

				<BlogArticleMeta author={author} date={date} tags={tags} />
			</Box>

			<Box sx={heroImageStyles}>
				<BlogImage hero src={heroSrc} alt='hero image' />
			</Box>

			<Box sx={contentContainerStyles}>{body}</Box>
		</Box>
	)
}

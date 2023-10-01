import ReplayIcon from '@mui/icons-material/Replay'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { BlogPost } from '@/services/blogPosts'
import BlogCard from './Card'

interface ToggleableBlogPost extends BlogPost {
	visible: boolean
}

interface Props {
	blogPosts: ToggleableBlogPost[]
	onResetSearch: () => void,
}

export default function BlogSearchResults({ blogPosts, onResetSearch }: Props) {
	if (!blogPosts.length) {
		return (
			<Stack
				alignItems='center'
				mt={12}
				spacing={6}
			>
				<Typography variant='h3'>No Posts found 😢</Typography>

				<Button
					variant='contained'
					size='large'
					startIcon={<ReplayIcon />}
					onClick={onResetSearch}
				>
					Reset search
				</Button>
			</Stack>
		)
	}

	return (
		<Grid
			container
			spacing={2}>
			{blogPosts.map(({ bodyTitle, description, heroSrc, url }, i) =>
				<Grid
					item
					xs={12}
					md={6}
					lg={4}
					xl={3}
					key={i}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center">
						<BlogCard
							description={description}
							heroSrc={heroSrc}
							title={bodyTitle}
							url={url}
						/>
					</Box>
				</Grid>,
			)}
		</Grid>
	)
}
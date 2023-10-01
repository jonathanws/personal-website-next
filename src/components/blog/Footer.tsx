import { Divider, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getBlogPosts } from '@/services/blogPosts'
import { BG_PRIMARY } from '@/services/theming'
import BlogCard from './Card'

export default function BlogFooter() {
	const router = useRouter()

	const blogPosts = getBlogPosts()
		.filter(({ url }) => url !== router.query.url) // remove the current article from the list
		.slice(0, 6) // max six posts

	return (
		<Box
			component="footer"
			sx={{
				alignItems: 'center',
				background: BG_PRIMARY,
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				maxWidth: '100vw',
				p: 3,
				pt: 9,
			}}
		>
			<Box sx={{
				width: {
					sm: '680px',
					xs: '100%',
				},
			}}>
				{
					blogPosts.length
						? <>
							<Typography variant='h4' mb={4}>Continue Reading</Typography>

							<Grid container spacing={2}>
								{
									blogPosts
										.map(({ bodyTitle, description, heroSrc, url }, i) =>
											<Grid item xs={12} sm={6} key={i}>
												<Box display='flex' justifyContent='center' alignItems='center'>
													<BlogCard description={description} heroSrc={heroSrc} title={bodyTitle} url={url} />
												</Box>
											</Grid>,
										)
								}
							</Grid>
						</>
						: <Typography variant='h5' align='center'><i>More articles coming soon!</i></Typography>
				}

				<Divider sx={{ my: 10 }} />

				<Stack direction='row' justifyContent='space-evenly' sx={{ my: 4 }}>
					<Link href='/'>Home</Link>
					<Link href='/blog'>Blog</Link>
				</Stack>
			</Box>
		</Box>
	)
}
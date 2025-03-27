import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getBlogPosts } from '@/services/blogPosts'
import { sectionPaddings } from '@/services/theming'

interface Props {
	backgroundColor: string
}

export default function SeeMyBlog({ backgroundColor }: Props) {
	const theme = useTheme()

	const slidesPerView = useMediaQuery(theme.breakpoints.up('sm'))
		? 1.75 // large devices
		: 1.25 // small devices

	const blogPreviews = getBlogPosts()
		.map(({ heroSrc, menuTitle, url }, i) => (
			<SwiperSlide key={i}>
				<a href={url}>
					<img
						alt={menuTitle}
						src={heroSrc}
						style={{
							height: '100%',
							width: '100%',
						}}
					/>
				</a>
			</SwiperSlide>
		))

	return (
		<Box sx={{ backgroundColor }}>
			<Container sx={sectionPaddings}>
				<Typography variant='h3'>Latest Blog Posts</Typography>

				<Swiper
					slidesPerView={slidesPerView}
					spaceBetween={30}
					modules={[Navigation]}
					navigation
				>
					{blogPreviews}
				</Swiper>

				<Box
					display='flex'
					justifyContent='center'
					mt={3}
				>
					<Button
						size='large'
						color='primary'
						variant='contained'
						href='/blog'
					>
						See all blog posts
					</Button>
				</Box>
			</Container>
		</Box>
	)
}

import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

interface Props {
	description: string
	heroSrc: string
	tags?: string[]
	title: string
	url: string
}

export default function BlogCard({ description, heroSrc, tags, title, url }: Props) {
	const router = useRouter()

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea onClick={() => router.push(url)}>
				<CardMedia
					sx={{ height: 190 }}
					image={heroSrc}
					title={title}
					component='img' />

				<CardContent>
					<Typography
						gutterBottom
						variant='h4'
						component='p'
						mt={0}
						style={{
							display: '-webkit-box',
							overflow: 'hidden',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: '2',
						}}>
						{title}
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'
					>
						{description}
					</Typography>
				</CardContent>

				{
					tags &&
					<CardActions sx={{ justifyContent: 'flex-end' }}>
						{tags.map((tag) => <Chip label={tag} key={tag} />)}
					</CardActions>
				}
			</CardActionArea>
		</Card>
	)
}
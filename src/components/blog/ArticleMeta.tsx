import { default as ShareIcon } from '@mui/icons-material/Share'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import copy from 'clipboard-copy'
import { useState } from 'react'
import { getAuthor } from '@/services/blogAuthors'
import { BlogPost } from '@/services/blogPosts'
import BlogChip from './Chip'

type Props = Pick<BlogPost, 'author' | 'date' | 'tags'>

export default function BlogArticleMeta({ author, date, tags }: Props) {
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const theme = useTheme()
	const { avatar, name, title } = getAuthor(author)

	// display at bottom on phones, top-right on every thing else
	const snackbarPosition: SnackbarProps['anchorOrigin'] = useMediaQuery(theme.breakpoints.up('md'))
		? { horizontal: 'right', vertical: 'top' }
		: { horizontal: 'center', vertical: 'bottom' }

	const onShare = () => {
		if (!snackbarOpen) {
			copy(window.location.href)
			setSnackbarOpen(true)
			setTimeout(() => setSnackbarOpen(false), 3_000)
		}
	}

	return (
		<>
			<Box sx={{
				display: 'flex',
				my: 4,
			}}>
				{avatar}
				<Stack direction='column' justifyContent='space-evenly' sx={{ ml: 2 }}>
					<Box sx={{ display: 'flex' }}>
						<Stack direction='row' spacing={1}>
							<Typography variant='h5'>{name}</Typography>
							<Typography variant='h5'>·</Typography>
							<Typography variant='h5'>{title}</Typography>
						</Stack>
					</Box>

					<Typography variant='body2'>Published on {date}</Typography>
				</Stack>
			</Box>

			{/* display tags and action buttons */}
			<Stack spacing={1} sx={{ marginBottom: 4 }}>
				<Divider />
				<Stack
					direction={'row'}
					spacing={4}
					sx={{
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					{tags.map((tag, i) => <BlogChip key={i} type={tag} />)}

					<Stack direction='row'>
						<Button size='large' startIcon={<ShareIcon />} onClick={onShare}>Share</Button>
					</Stack>
				</Stack>
				<Divider />
			</Stack>

			<Snackbar
				anchorOrigin={snackbarPosition}
				open={snackbarOpen}>
				<Alert
					severity='success'
					variant='filled'
				>
					Link copied to clipboard
				</Alert>
			</Snackbar>
		</>
	)
}

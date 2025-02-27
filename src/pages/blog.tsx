import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import BlogSearchResults from '@/components/blog/SearchResults'
import BlogSelectableChip from '@/components/blog/SelectableChip'
import Header from '@/components/Header'
import { blogPostTags, getBlogPosts } from '@/services/blogPosts'
import { BG_ALT } from '@/services/theming'

export default function Blog() {
	const [toggleableBlogTags, setToggleableBlogTags] = useState(blogPostTags.map((tag) => ({
		name: tag,
		selected: true,
	})))
	const onTagClick = (index: number) => {
		setToggleableBlogTags((previousToggleableBlogTags) =>
			previousToggleableBlogTags.map((tag, i) => index === i
				? {
					...tag,
					selected: !tag.selected,
				}
				: tag
			))
	}

	const [toggleableBlogPosts, setToggleableBlogPosts] = useState(getBlogPosts().map((blog) => ({
		...blog,
		visible: true,
	})))
	useEffect(() => {
		// Don't show blogs if none of the relevant chips are selected
		setToggleableBlogPosts((previousToggleableBlogPosts) =>
			previousToggleableBlogPosts.map((blog) => ({
				...blog,
				visible: blog.tags.some((tag) =>
					toggleableBlogTags.some(({ name, selected }) => name === tag && selected)
				),
			}))
		)
	}, [toggleableBlogTags])

	const onResetSearch = () => {
		setToggleableBlogTags((previousToggleableBlogTags) =>
			previousToggleableBlogTags.map(
				(tag) => ({
					...tag,
					selected: true,
				})
			)
		)
	}

	return (
		<>
			<Head>
				<title>Blog posts</title>
				{/* this line sometimes shows up in link previews */}
				<meta name='description' content="Jon's Blogs" />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>

			<Header />

			<Container
				maxWidth={false}
				sx={{
					backgroundColor: BG_ALT,
					minHeight: '100vh',
				}}>
				<Container sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					pt: 4,
				}}>
					<Typography
						variant='h2'
						align='center'
					>
						Blog
					</Typography>

					<Box sx={{
						mb: 10,
						width: {
							sm: '80%',
							xl: '80rem',
							xs: '100%',
						},
					}}>
						<Stack
							direction='row'
							spacing={1}
							sx={{
								mb: 2,
								mt: 6,
							}}
						>
							{toggleableBlogTags.map((tag, i) =>
								<BlogSelectableChip
									key={i}
									index={i}
									label={tag.name}
									selected={tag.selected}
									onClick={onTagClick}
								/>,
							)}
						</Stack>

						<Divider sx={{
							marginY: 3,
							width: '100%',
						}}/>

						<BlogSearchResults
							blogPosts={toggleableBlogPosts.filter(({ visible }) => visible)}
							onResetSearch={onResetSearch}
						/>
					</Box>
				</Container>
			</Container>
		</>
	)
}
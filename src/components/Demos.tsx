import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { getDemos } from '@/services/demos'
import { sectionPaddings } from '@/services/theming'

interface Props {
	backgroundColor: string
}

export default function Demos({ backgroundColor }: Props) {
	const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('sm'))

	const displayDemos = () => getDemos().map(({ alt, description, src, title, url }, index) => (
		<Box
			display='flex'
			flexDirection={
				isSmallDevice
					? 'column'
					: index % 2 === 0
						? 'row'
						: 'row-reverse'
			}
			key={index}
			sx={{
				gap: 2,
				pl: 2,
				pr: 2,
			}}
		>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
			>
				<Typography pb={2}>{title}</Typography>
				<Typography variant='subtitle1'>{description}</Typography>
			</Box>

			<a
				href={url}
				style={{ width: isSmallDevice ? '100%' : '50%' }}
			>
				<img
					alt={alt}
					src={src}
					style={{ width: '100%' }}
				/>
			</a>
		</Box>
	))

	return (
		<Box sx={{ backgroundColor }}>
			<Container sx={sectionPaddings}>
				<Typography variant='h3'>Demos</Typography>

				{displayDemos()}
			</Container>
		</Box>
	)
}
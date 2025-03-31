import Box from '@mui/material/Box'
import { blueGrey } from '@mui/material/colors'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { getDemos } from '@/services/demos'
import { sectionPaddings } from '@/services/theming'

interface Props {
	backgroundColor: string
}

export default function Demos({ backgroundColor }: Props) {
	const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('sm'))

	const flavorText = 20
	const promoImg = 100 - flavorText

	const flavorTextWidth = `${flavorText}%`
	const promoImgWidth = `${promoImg}%`

	const displayDemos = () => getDemos().map(({ alt, description, heroSrc, title, url }, index) => (
		<Box
			display='flex'
			flexDirection={
				isSmallDevice
					? 'column'
					: index % 2 === 0
						? 'row'
						: 'row-reverse'
			}
			px={2}
			key={index}
		>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				width={isSmallDevice ? '100%' : flavorTextWidth}
			>
				<Typography variant='h4' pb={2}>{title}</Typography>
				<Typography variant='subtitle1'>{description}</Typography>
			</Box>

			<Link href={url} sx={{
				'&:hover': { background: alpha(blueGrey[50], 0.05) },
				borderRadius: 4,
				width: isSmallDevice ? '100%' : promoImgWidth,
			}}>
				<img alt={alt} src={heroSrc} style={{ maxWidth: '100%' }} />
			</Link>
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
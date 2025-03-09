import { useTheme, useMediaQuery, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'

interface Props {
	displayName: string
	focus: boolean
	id: string
	logo: string
	onClick: () => void
}

export default function TeamPickerGridItem({ displayName, focus, id, logo, onClick }: Props) {
	const theme = useTheme()

	const isXs = useMediaQuery(theme.breakpoints.down('sm')) // <600px
	const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')) // 600px-900px
	const isMd = useMediaQuery(theme.breakpoints.up('lg')) // >900px

	const [imgSize, setImgSize] = useState<number>()

	useEffect(() => {
		console.log('use effecting')

		if (isXs) {
			console.log('setting xs')
			setImgSize(32)
		} else if (isSm) {
			console.log('setting sm')
			// setImgSize(48)
			setImgSize(32)
		} else if (isMd) {
			// setImgSize(60)
			console.log('setting md')
			setImgSize(44)
		}
	}, [isXs, isSm, isMd])

	return (
		<IconButton
			onClick={() => onClick()}
			sx={{
				aspectRatio: '1 / 1',
				border: focus ? '2px solid white' : '2px solid transparent',
				borderRadius: '25%',
				m: 0.5,
				p: 1,
			}}
		>
			<Box
				alt={displayName}
				component='img'
				sx={{
					height: imgSize,
					margin: 0.5,
					width: imgSize,
				}}
				src={logo}
			/>
		</IconButton>
		// <Box
		// 	display='flex'
		// 	alignItems='center'
		// 	onClick={() => onClick()}
		// 	sx={{
		// 		'&:hover': { background: 'gray' },
		// 		border: focus ? '2px solid white' : '2px solid transparent',
		// 		borderRadius: 2,
		// 	}}
		// >
		// 	<Box
		// 		component='img'
		// 		sx={{
		// 			height: imgSize,
		// 			margin: 1,
		// 			width: imgSize,
		// 		}}
		// 		src={logo}
		// 	/>
		// </Box>
	)
}
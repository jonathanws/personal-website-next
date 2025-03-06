import Box from '@mui/material/Box'

interface Props {
	focus: boolean
	id: string
	logo: string
	onClick: () => void
}

export default function TeamPickerGridItem({ focus, id, logo, onClick }: Props) {
	const imgSize = 35

	return (
		<Box
			display='flex'
			alignItems='center'
			onClick={() => onClick()}
			sx={{
				'&:hover': { background: 'gray' },
				border: focus ? '2px solid white' : '2px solid transparent',
				borderRadius: 2,
			}}
		>
			<Box
				component='img'
				sx={{
					height: imgSize,
					margin: 1,
					width: imgSize,
				}}
				src={logo}
			/>
		</Box>
	)
}
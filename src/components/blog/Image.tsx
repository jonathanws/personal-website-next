import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
	alt: string
	caption?: string
	hero?: boolean
	src: string
}

export default function BlogImage({ alt, caption, hero = false, src }: Props) {
	function ImgComponent({ marginBottom = 4 }: { marginBottom?: number }) {
		return (
			<Box
				component="img"
				alt={alt}
				src={src}
				sx={{
					marginBottom,
					marginTop: 4,
					...(
						hero
							? {
								marginLeft: -3,
								marginRight: -3,
								width: 'calc(100% + 48px)',
							}
							: {
								width: '100%',
							}
					),
				}}
			/>
		)
	}

	return caption
		? <Box>
			<ImgComponent marginBottom={0} />
			<Typography
				variant='caption'
				align='center'
				sx={{
					display: 'block',
					fontStyle: 'italic',
					mb: 4,
				}}
			>
				{caption}
			</Typography>
		</Box>
		: <ImgComponent />
}
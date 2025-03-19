import { SxProps, Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

interface Props {
	children?: React.ReactNode
	sxProps?: SxProps<Theme>
}

export default function PrintLineSegment({ children, sxProps }: Props) {
	return (
		<Typography
			component='code'
			sx={sxProps}
			display='inline'
			fontSize={14}
			fontWeight={500}
			whiteSpace='pre-wrap'
		>
			{children}
		</Typography>
	)
}
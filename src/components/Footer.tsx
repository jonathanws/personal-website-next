import Box from '@mui/material/Box'

interface Props {
	backgroundColor: string
}

export default function Footer({ backgroundColor }: Props) {
	return <Box sx={{
		backgroundColor,
		height: 100,
	}} />
}

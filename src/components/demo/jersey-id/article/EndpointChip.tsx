import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({
	fallback: ['Courier', 'monospace'],
	subsets: ['latin'],
})

/**
 * UI element acting as headers for the individual endpoint descriptions
 */
export default function EndpointChip ({ endpoint }: { endpoint: string }) {
	const imgSize = '26px'
	const imgStyles = {
		component: 'img' as const,
		sx: {
			display: {
				sm: 'block',
				xs: 'none',
			},
			height: imgSize,
			width: imgSize,
		},
	}

	return (
		<Box mt={5} mb={2}>
			<Box
				display='inline-flex'
				alignItems='center'
				bgcolor='#482880'
				py={1}
				px={3}
				borderRadius={2}
				gap={{ sm: 2, xs: 0 }}
			>
				<Stack gap={1} flexDirection='row'>
					<Box {...imgStyles} src='/deno.svg' alt='deno' />
					<Box {...imgStyles} src='/typescript.svg' alt='typescript' />
				</Stack>

				<Typography
					display='inline'
					fontFamily={firaCode.style.fontFamily}
					fontSize='17px'
					fontWeight={500}
				>
					<b>POST</b> {endpoint}
				</Typography>
			</Box>
		</Box>
	)
}
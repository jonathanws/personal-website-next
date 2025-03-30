/* eslint-disable sort-keys */
import Box from '@mui/material/Box'
import { green, orange, pink, red, yellow } from '@mui/material/colors'
import { useEffect, useState } from 'react'

export default function DebugBreakpoints() {
	const [windowWidth, setWindowWidth] = useState(0)

	useEffect(() => {
		const onResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', onResize)

		return () => window.removeEventListener('resize', onResize)
	}, [])

	// just in case
	if (process.env.NODE_ENV !== 'development') {
		return null
	}

	return (
		<Box
			sx={{
				'&:before': {
					content: {
						xl: '"xl"',
						lg: '"lg"',
						md: '"md"',
						sm: '"sm"',
						xs: '"xs"',
					},
				},
				background: {
					xl: pink[900],
					lg: red[900],
					md: orange[900],
					sm: yellow[900],
					xs: green[900],
				},
				borderRadius: 2,
				m: 2,
				px: 3,
				py: 1,
				mt: 12,
			}}
		> - {windowWidth}px</Box>
	)
}
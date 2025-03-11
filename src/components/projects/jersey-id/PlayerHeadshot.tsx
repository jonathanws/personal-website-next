import Box, { BoxProps } from '@mui/material/Box'
import { useEffect, useState } from 'react'

interface Props {
	fadeTo: string
	headshot: {
		alt: string
		href: string
	}
	logo: {
		alt: string
		href: string
	}
	teamColor: string
}

export default function PlayerHeadshot({ fadeTo, headshot, logo, teamColor }: Props) {
	const [currentHeadshot, setCurrentHeadshot] = useState(headshot)
	const [currentLogo, setCurrentLogo] = useState(logo)

	const [isTransitioning, setIsTransitioning] = useState(false)
	const [visible, setVisible] = useState(true)

	const [headshotLoaded, setHeadshotLoaded] = useState(false)
	const [logoLoaded, setLogoLoaded] = useState(false)

	const TRANSITION_DURATION = 150

	// Handle image switching with proper preloading
	useEffect(() => {
		if (headshot.href === currentHeadshot.href) {
			return
		}

		setIsTransitioning(true)
		setVisible(false) // start fade-out

		const createPseudoImg = (src: string, onLoad: () => void) => {
			const img = new Image()
			img.src = src
			img.onload = () => onLoad()
		}

		setTimeout(() => {
			createPseudoImg(headshot.href, () => setHeadshotLoaded(true))
			createPseudoImg(logo.href, () => setLogoLoaded(true))
		}, TRANSITION_DURATION)
	}, [headshot.href, currentHeadshot.href, logo])

	// when both images are loaded, update and show new content
	useEffect(() => {
		if (!headshotLoaded || !logoLoaded) {
			return
		}

		setCurrentHeadshot(headshot)
		setCurrentLogo(logo)
		setHeadshotLoaded(false)
		setLogoLoaded(false)

		setVisible(true) // start fade-in animation
		setIsTransitioning(false)
	}, [headshotLoaded, logoLoaded, headshot, logo])

	const getStylesForZLevel = (zIndex: number, background: string) => ({
		background,
		inset: 0,
		position: 'absolute',
		zIndex,
	})
	// players slide in from the right, and background logo slides in from the left
	const getStylesForImageFrom = (dir: 'left' | 'right'): BoxProps['sx'] => {
		const translateX = (n: number) => `translateX(${n}%)`
		const duration = `${TRANSITION_DURATION / 1_000}s`
		const distance = 2

		return {
			opacity: dir === 'right'
				? visible ? 1 : 0
				: visible ? 0.5 : 0, // background logo only ever gets to half transparency
			transform: isTransitioning
				? translateX(dir === 'right' ? distance * -1 : distance) // Move out on exit
				: translateX(0), // center of div
			transition: `transform ${duration} ease-out, opacity ${duration} ease-out`,
		}
	}

	return (
		<Box
			display='inline-block' // ensure it wraps the image size
			position='relative'
			width='100%'
		>
			{/* base background color */}
			<Box sx={getStylesForZLevel(1, `linear-gradient(0deg, #${teamColor}, #${teamColor})`)} />

			{/* team logo */}
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				zIndex={2}
				position='absolute'
				width='100%'
				height='100%'
				overflow='hidden'
				top={-1} // band-aid to prevent the single row of pixels from displaying on some screens
				sx={getStylesForImageFrom('left')}
			>
				<Box
					component='img'
					src={currentLogo.href}
					alt={currentLogo.alt}
					width='85%'
				/>
			</Box>

			{/* underneath spiral gradient.  Gradient ends at the 'closest side', won't go to corners */}
			{/* <Box sx={getStylesForZLevel(3, `radial-gradient(closest-side, rgba(${spiral}, ${spiral}, ${spiral}, 0.8), rgba(${spiral}, ${spiral}, ${spiral}, 0))`)} /> */}

			{/* player headshot */}
			<Box
				display='block'
				component='img'
				src={currentHeadshot.href}
				alt={currentHeadshot.alt}
				position='relative'
				width='100%'
				zIndex={4}
				sx={getStylesForImageFrom('right')}
			/>

			{/* bottom fade-out gradient */}
			<Box sx={getStylesForZLevel(5, `linear-gradient(to bottom, transparent 70%, ${fadeTo} 100%)`)} />
		</Box>
	)
}
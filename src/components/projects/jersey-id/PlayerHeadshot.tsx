import Box from '@mui/material/Box'

interface Props {
	fadeTo: string
	src: string
}

export default function PlayerHeadshot({ fadeTo, src }: Props) {
	const baseBackgroundColor = '#222'
	const spiral = '255'

	// Decorations for headshots.  Not using <img> to display the headshot since we need some gradients on top, and some underneath
	const gradients = [
		// bottom fade-out gradient
		`linear-gradient(to bottom, transparent 70%, ${fadeTo} 100%)`,
		// set as css so it can be placed between gradients
		`url('${src}')`,
		// underneath spiral gradient.  Gradient ends at the "closest side", won't go to corners
		`radial-gradient(closest-side, rgba(${spiral}, ${spiral}, ${spiral}, 0.8), rgba(${spiral}, ${spiral}, ${spiral}, 0))`,
		// base color of the background
		`linear-gradient(0deg, ${baseBackgroundColor}, ${baseBackgroundColor})`,
	]

	return <Box
		sx={{
			background: gradients.join(','),
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			height: '300px',
			width: '380px',
		}}
	/>
}
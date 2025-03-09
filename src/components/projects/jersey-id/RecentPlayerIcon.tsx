import Button from '@mui/material/Button'
import { darken } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

interface Props {
	onClick: (index: number) => void
	color: string
	index: number
	jersey: string
	logo: string
}

export default function RecentPlayerIcon({ color, index, jersey, logo, onClick }: Props) {
	// CSS background-X properties expect comma-delimited arguments for each property, with index
	// determining which background to apply to.  This array keeps them together and more readable.
	const backgrounds = [
		{
			backgroundImage: `url('${logo}')`,
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: '85%',
		},
		{
			backgroundImage: `linear-gradient(0deg, #${color}, #${color})`,
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
		},
	]

	return (
		<Button
			onClick={() => onClick(index)}
			sx={{
				aspectRatio: '1 / 1',
				backgroundImage: backgrounds.map(({ backgroundImage }) => backgroundImage).join(','),
				backgroundPosition: backgrounds.map(({ backgroundPosition }) => backgroundPosition).join(','),
				backgroundRepeat: backgrounds.map(({ backgroundRepeat }) => backgroundRepeat).join(','),
				backgroundSize: backgrounds.map(({ backgroundSize }) => backgroundSize).join(','),
				border: `8px solid ${darken(`#${color}`, 0.125)}`,
				borderRadius: '50%',
				boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4)', // left-right / up-down / blur / color
				width: 80,
			}}
		>
			<Typography
				sx={{
					fontSize: '2.5rem',
					fontWeight: 'bold',
					// Since there's no great way to create a text outline without it also covering the text itself,
					// create four text shadows (one for each cardinal direction) to give the illusion of an outline
					textShadow: [...Array(4)]
						.map(() => '0 0 5px black')
						.join(','),
				}}
			>
				{jersey}
			</Typography>
		</Button>
	)
}
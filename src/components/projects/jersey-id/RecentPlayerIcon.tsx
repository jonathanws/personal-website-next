import Button from '@mui/material/Button'

interface Props {
	onClick: (index: number) => void
	color: string
	index: number
	jersey: string
}

export default function RecentPlayerIcon({ color, index, jersey, onClick }: Props) {
	return (
		<Button
			onClick={() => onClick(index)}
			sx={{
				aspectRatio: '1 / 1',
				border: `5px solid #${color}`,
				borderRadius: '50%',
				color: '#ffffff',
				fontSize: '1.8rem',
				width: 80,
			}}
		>
			{jersey}
		</Button>
	)
}
import { grey } from '@mui/material/colors'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

interface Props {
	children: React.ReactNode
	onClick: IconButtonProps['onClick']
	selected?: boolean
}

export default function SquareIconButton ({ children, onClick, selected }: Props) {
	return (
		<IconButton
			onClick={onClick}
			size='medium'
			sx={{
				borderRadius: '15%',
				...(selected && { background: grey[700] }),
			}}
		>
			{children}
		</IconButton>
	)
}
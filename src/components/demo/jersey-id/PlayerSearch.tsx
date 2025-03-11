import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import NumericInput from './NumericInput'

interface Props {
	expandIconOpen: boolean
	input: string
	onJerseyChange: (n: string) => void
	onSearch: () => void
	onTeamPickerClick: () => void
	teamLogo?: string
}

const PLACEHOLDER_IMG = 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/nfl.png'

export default function PlayerSearch({ expandIconOpen, input, onJerseyChange, onSearch, onTeamPickerClick, teamLogo = PLACEHOLDER_IMG }: Props) {
	const teamImgSize = 40

	return (
		<Stack
			direction='row'
			gap={1}
			mx={1}
			pb={1}
		>
			{/* TeamPicker toggle button */}
			<Button
				color='inherit'
				sx={{ gap: 1 }}
				onClick={onTeamPickerClick}
			>
				<ExpandMoreIcon
					sx={{
						fontSize: '2rem',
						transform: expandIconOpen ? `rotate(${180}deg)` : `rotate(${0}deg)`,
						transition: 'transform 0.2s ease-in-out',
					}}
				/>

				<Box
					component='img'
					src={teamLogo}
					sx={{
						height: teamImgSize,
						width: teamImgSize,
					}}
				/>
			</Button>

			<NumericInput
				onChange={(newJersey) => onJerseyChange(newJersey)}
				onEnter={onSearch}
				value={input}
				sx={{ flexGrow: 1 }}
			/>

			<Button
				onClick={onSearch}
				size='large'
				color='inherit'
			>
				<SearchIcon sx={{ fontSize: '2rem' }} />
			</Button>
		</Stack>
	)
}
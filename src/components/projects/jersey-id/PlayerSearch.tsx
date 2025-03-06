import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import NumericInput from './NumericInput'

interface Props {
	input: string
	onJerseyChange: (n: string) => void
	onSearch: () => void
	onTeamPickerClick: () => void
	teamLogo?: string
}

const PLACEHOLDER_IMG = 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/nfl.png'

export default function PlayerSearch({ input, onJerseyChange, onSearch, onTeamPickerClick, teamLogo = PLACEHOLDER_IMG }: Props) {
	const teamImgSize = 35

	return (
		<Box display='flex'>
			{/* TeamPicker toggle button */}
			<Button
				variant='outlined'
				onClick={onTeamPickerClick}
			>
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
			/>

			<IconButton onClick={onSearch}>
				<SearchIcon />
			</IconButton>
		</Box>
	)
}
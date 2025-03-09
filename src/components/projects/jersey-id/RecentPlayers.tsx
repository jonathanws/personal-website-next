import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { NFLAthleteAndNFLTeam } from '@/services/nfl-service'
import RecentPlayerIcon from './RecentPlayerIcon'

interface Props {
	onRecentPlayerClick: (index: number) => void
	recentPlayers: NFLAthleteAndNFLTeam[]
}

export default function RecentPlayers({ onRecentPlayerClick, recentPlayers }: Props) {
	const overlap = 4
	const padding = 1

	return (
		<Collapse
			className='somecollapsething'
			in={recentPlayers.length > 0}
			sx={{
				background: 'gray',
				zIndex: 1,
				... recentPlayers.length > 0
					? {
						mt: overlap * -1,
						p: 1,
						pt: padding + overlap,
					}
					: {},
			}}
		>
			<Box display='flex' gap={2}>
				{
					recentPlayers.map(({ player, team }, index) => <RecentPlayerIcon
						key={index}
						color={team.color}
						index={index}
						jersey={player.jersey}
						logo={team.logo}
						onClick={() => onRecentPlayerClick(index)}
					/>)
				}
			</Box>
		</Collapse>
	)
}
import Box from '@mui/material/Box'
import { NFLAthleteAndNFLTeam } from '@/services/nfl-service'
import RecentPlayerIcon from './RecentPlayerIcon'

interface Props {
	onRecentPlayerClick: (index: number) => void
	recentPlayers: NFLAthleteAndNFLTeam[]
}

export default function RecentPlayers({ onRecentPlayerClick, recentPlayers }: Props) {
	return (
		<Box display='flex'>
			{
				recentPlayers.map(({ player, team }, index) => <RecentPlayerIcon
					key={index}
					color={team.color}
					index={index}
					jersey={player.jersey}
					onClick={() => onRecentPlayerClick(index)}
				/>)
			}
		</Box>
	)
}
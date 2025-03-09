import Box from '@mui/material/Box'
import { NFLAthleteAndNFLTeam } from '@/services/nfl-service'
import CollapsableOverlapPaper from './CollapsableOverlapPaper'
import { borderRadiusNum } from './PlayerLookup'
import RecentPlayerIcon from './RecentPlayerIcon'

interface Props {
	onRecentPlayerClick: (index: number) => void
	recentPlayers: NFLAthleteAndNFLTeam[]
}

export default function RecentPlayers({ onRecentPlayerClick, recentPlayers }: Props) {
	return (
		<CollapsableOverlapPaper
			background='gray'
			borderRadius={borderRadiusNum}
			open={recentPlayers.length > 0}
			zIndex={1}
		>
			<Box
				display='flex'
				gap={2}
				p={2}
			>
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
		</CollapsableOverlapPaper>
	)
}
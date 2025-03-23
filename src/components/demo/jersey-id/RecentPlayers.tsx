import Box from '@mui/material/Box'
import { blueGrey } from '@mui/material/colors'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'
import CollapsableOverlapPaper from './CollapsableOverlapPaper'
import { borderRadiusNum } from './PlayerLookup'
import RecentPlayerIcon from './RecentPlayerIcon'

export default function RecentPlayers() {
	const [recentPlayers, setStore] = useJerseyIdContext((store) => store.recentPlayers)

	return (
		<CollapsableOverlapPaper
			elevation={3}
			background={blueGrey[500]}
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
						onClick={() => setStore({ playerAndTeam: (recentPlayers[index]) })}
					/>)
				}
			</Box>
		</CollapsableOverlapPaper>
	)
}
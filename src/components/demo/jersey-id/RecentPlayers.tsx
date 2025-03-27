import { blueGrey } from '@mui/material/colors'
import Grid from '@mui/material/Grid'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'
import CollapsableOverlapPaper from './CollapsableOverlapPaper'
import { borderRadiusNum } from './PlayerLookup'
import { MAX_RECENT_PLAYERS } from './PlayerSearch'
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
			<Grid
				container
				p={2}
				spacing={2}
				sx={{
					display: 'grid',
					gap: 2,
					gridAutoColumns: 'minmax(0, 1fr)',
					gridTemplateColumns: {
						md: `repeat(${MAX_RECENT_PLAYERS.md}, 1fr)`,
						sm: `repeat(${MAX_RECENT_PLAYERS.sm}, 1fr)`,
						xs: `repeat(${MAX_RECENT_PLAYERS.xs}, 1fr)`,
					},
					justifyItems: 'stretch',
				}}
			>
				{
					recentPlayers.map(({ player, team }, index) => <Grid
						key={`${team.id}-${player.jersey}`}
						item
					>
						<RecentPlayerIcon
							color={team.color}
							index={index}
							jersey={player.jersey}
							logo={team.logo}
							onClick={() => setStore({ playerAndTeam: (recentPlayers[index]) })}
						/>
					</Grid>)
				}
			</Grid>
		</CollapsableOverlapPaper>
	)
}
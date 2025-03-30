import { blueGrey } from '@mui/material/colors'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'
import CollapsableOverlapPaper from './CollapsableOverlapPaper'
import { borderRadiusNum } from './PlayerLookup'
import { MAX_RECENT_PLAYERS } from './PlayerSearch'
import RecentPlayerIcon from './RecentPlayerIcon'

export default function RecentPlayers() {
	const [recentPlayers, setStore] = useJerseyIdContext((store) => store.recentPlayers)

	const theme = useTheme()
	const isMd = useMediaQuery(theme.breakpoints.up('md'))
	const isSm = useMediaQuery(theme.breakpoints.up('sm'))
	const maxRecentPlayers = isMd
		? MAX_RECENT_PLAYERS.md
		: isSm
			? MAX_RECENT_PLAYERS.sm
			: MAX_RECENT_PLAYERS.xs

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
				sx={{
					display: 'grid',
					gap: {
						sm: 2,
						xs: 1,
					},
					gridAutoColumns: 'minmax(0, 1fr)',
					gridTemplateColumns: `repeat(${maxRecentPlayers}, 1fr)`,
					justifyItems: 'center',
					[`.MuiGrid-item:nth-of-type(n+${1 + (maxRecentPlayers)})`]: { display: 'none' },
				}}
			>
				{
					recentPlayers.map(({ player, team }, index) => <Grid key={`${team.id}-${player.jersey}`} item>
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
import { AlertColor } from '@mui/material/Alert'
import { NFLAthleteAndNFLTeam, NFLTeam } from '@/services/nfl-service'
import createFastContext from './FastContext'

/**
 * context for the entire jersey ID demo.  All components in the demo have access to this "state"
 */

interface State {
	// strings for querying the backend
	jerseyForQuery: string
	teamIdForQuery: string

	teams: NFLTeam[]
	playerAndTeam: NFLAthleteAndNFLTeam | undefined // The player currently in focus
	recentPlayers: NFLAthleteAndNFLTeam[]

	showTutorialClickRandomPlayerButton: boolean // show/hide the tutorial tooltip over the random-player button
	showTeamPicker: boolean
	loading: boolean
	snackbar: {
		open: boolean
		severity: AlertColor
		text: string
	}
}

const initialState: State = {
	jerseyForQuery: '',
	loading: false,
	playerAndTeam: undefined,
	recentPlayers: [],
	showTeamPicker: false,
	showTutorialClickRandomPlayerButton: true,
	snackbar: {
		open: false,
		severity: 'info',
		text: '',
	},
	teamIdForQuery: '',
	teams: [],
}

const {
	Provider: JerseyIdContextProvider,
	useStore: useJerseyIdContext,
} = createFastContext<State>(initialState)

export {
	JerseyIdContextProvider,
	useJerseyIdContext,
}
import { createClient, FunctionInvokeOptions } from '@supabase/supabase-js'
import { getHostname, NEXT_PUBLIC_SUPABASE_ANON_KEY } from './constants'

const supabase = createClient(getHostname('jersey-id'), NEXT_PUBLIC_SUPABASE_ANON_KEY)

type SupabaseFunctionName =
	| 'player-by-team-jersey'
	| 'random-player'
	| 'teams'


const invokeSupabaseFunction = async(name: SupabaseFunctionName, options?: FunctionInvokeOptions) => supabase.functions.invoke(name, options)

interface NFLAthleteAndNFLTeam {
	player: NFLAthlete
	team: NFLTeam
}

interface NFLAthlete {
	displayHeight: string
	displayWeight: string
	firstName: string
	fullName: string
	headshot: {
		href: string
		alt: string
	}
	id: string
	jersey: string
	lastName: string
	position: {
		name: string
		abbreviation: string
	}
}

const isNFLPosition = (maybe: unknown): maybe is NFLAthlete['position'] =>
	typeof maybe === 'object'
	&& maybe !== null
	&& 'name' in maybe && typeof maybe.name === 'string'
	&& 'abbreviation' in maybe && typeof maybe.abbreviation === 'string'

const isNFLHeadshot = (maybe: unknown): maybe is NFLAthlete['headshot'] =>
	typeof maybe === 'object'
	&& maybe !== null
	&& 'href' in maybe && typeof maybe.href === 'string'
	&& 'alt' in maybe && typeof maybe.alt === 'string'

const isNFLAthlete = (maybe: unknown): maybe is NFLAthlete =>
	typeof maybe === 'object'
	&& maybe !== null
	&& 'id' in maybe && typeof maybe.id === 'string'
	&& 'displayHeight' in maybe && typeof maybe.displayHeight === 'string'
	&& 'displayWeight' in maybe && typeof maybe.displayWeight === 'string'
	&& 'firstName' in maybe && typeof maybe.firstName === 'string'
	&& 'lastName' in maybe && typeof maybe.lastName === 'string'
	&& 'fullName' in maybe && typeof maybe.fullName === 'string'
	&& ('jersey' in maybe ? typeof maybe.jersey === 'string' : true)
	&& 'position' in maybe && isNFLPosition(maybe.position)
	&& 'headshot' in maybe && isNFLHeadshot(maybe.headshot)

const isNFLAthleteAndTeam = (maybe: unknown): maybe is NFLAthleteAndNFLTeam =>
	typeof maybe === 'object'
	&& maybe !== null
	&& 'player' in maybe && isNFLAthlete(maybe.player)
	&& 'team' in maybe && isNFLTeam(maybe.team)

const getPlayerByTeamIdAndJersey = async (teamId: string, jersey: string) => {
	try {
		const { data, error } = await invokeSupabaseFunction('player-by-team-jersey', { body: { jersey, teamId } })

		if (error) {
			console.error(`Error fetching player for team ${teamId} and jersey ${jersey}`, error)

			return
		}

		// successful call, but player just doesn't exist
		if (typeof data === 'string' && data === '') {
			console.log('player not found')

			return
		}

		if (!isNFLAthleteAndTeam(data)) {
			console.error('Malformed data returned for specific player', data)

			return
		}

		return data
	} catch (e) {
		console.error(e, 'error fetching player by team id and jersey')
	}
}

const getRandomPlayer = async () => {
	try {
		const { data, error } = await invokeSupabaseFunction('random-player')

		if (error) {
			console.error('Error fetching random player')

			return
		}

		if (!isNFLAthleteAndTeam(data)) {
			console.error('Malformed data returned for random player')

			return
		}

		return data
	} catch (e) {
		console.error(e, 'error fetching random athlete')
	}
}

/**
 * This should match the backend's NFLTeam as the response from querying Rapid API
 *
 * Once I figure out how to merge types for frontend and backend, this could be deleted
*/
interface NFLTeamBackend {
	abbreviation: string
	color: string
	displayName: string
	id: string
	location: string
	name: string
}

/**
 * The backend adds 'logo' to the result of the backend's query
 */
interface NFLTeam extends NFLTeamBackend {
	logo: string
}

const isNFLTeam = (maybe: unknown): maybe is NFLTeam =>
	typeof maybe === 'object'
	&& maybe !== null
	&& 'abbreviation' in maybe && typeof maybe.abbreviation === 'string'
	&& 'color' in maybe && typeof maybe.color === 'string'
	&& 'displayName' in maybe && typeof maybe.displayName === 'string'
	&& 'id' in maybe && typeof maybe.id === 'string'
	&& 'location' in maybe && typeof maybe.location === 'string'
	&& 'logo' in maybe && typeof maybe.logo === 'string'
	&& 'name' in maybe && typeof maybe.name === 'string'

const isNFLTeams = (maybeNFLTeams: unknown): maybeNFLTeams is NFLTeam[] =>
	Array.isArray(maybeNFLTeams) &&
	maybeNFLTeams.every((t) => isNFLTeam(t))

const getTeams = async () => {
	try {
		const { data, error } = await invokeSupabaseFunction('teams')

		if (error) {
			console.error('Error fetching teams', error)

			return []
		}

		if (!data || !isNFLTeams(data)) {
			console.error('Malformed data returned for teams')

			return []
		}


		return data
	} catch (e) {
		console.error(e, 'error fetching teams')
	}
}

export {
	getPlayerByTeamIdAndJersey,
	getRandomPlayer,
	getTeams,
	type NFLAthlete,
	type NFLAthleteAndNFLTeam,
	type NFLTeam,
}

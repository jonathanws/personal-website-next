import { createClient, FunctionInvokeOptions } from '@supabase/supabase-js'
import { getHostname, NEXT_PUBLIC_SUPABASE_ANON_KEY } from './constants'

const supabase = createClient(getHostname('jersey-id'), NEXT_PUBLIC_SUPABASE_ANON_KEY)

const SUPABASE_FUNCTIONS = [
	'player-by-team-jersey',
	'random-player',
	'teams',
] as const

const invokeSupabaseFunction = async(name: typeof SUPABASE_FUNCTIONS[number], options?: FunctionInvokeOptions) => supabase.functions.invoke(name, options)

interface NFLAthlete {
	id: string
	firstName: string
	lastName: string
	fullName: string
	jersey: string
	headshot: {
		href: string
		alt: string
	}
	position: {
		name: string
		abbreviation: string
	}
}

const isNFLAthlete = (maybe: any): maybe is NFLAthlete =>
	maybe &&
	maybe.id && typeof maybe.id === 'string' &&
	maybe.firstName && typeof maybe.firstName === 'string' &&
	maybe.lastName && typeof maybe.lastName === 'string' &&
	maybe.fullName && typeof maybe.fullName === 'string' &&
	(maybe.jersey ? typeof maybe.jersey === 'string' : true) &&
	maybe.position &&
	maybe.position.name && typeof maybe.position.name === 'string' &&
	maybe.position.abbreviation && typeof maybe.position.abbreviation === 'string' &&
	maybe.headshot &&
	maybe.headshot.href &&
	maybe.headshot.alt

const getPlayerByTeamIdAndJersey = async (teamId: string, jersey: string) => {
	try {
		const { data, error } = await invokeSupabaseFunction(
			'player-by-team-jersey',
			{ body: { jersey, teamId } },
		)

		if (error) {
			console.error(`Error fetching player for team ${teamId} and jersey ${jersey}`, error)

			return
		}

		if (!isNFLAthlete(data)) {
			console.error('Malformed data returned for specific player')

			return
		}

		return data
	} catch (e) {
		console.error(e, 'error fetching player by team id and jersey')
	}
}

interface RandomPlayer {
	player: NFLAthlete
	teamId: string
}

const isRandomPlayer = (maybe: any): maybe is RandomPlayer =>
	typeof maybe === 'object'
	&& maybe !== null
	&& 'player' in maybe && typeof isNFLAthlete(maybe.player)
	&& 'teamId' in maybe && typeof maybe.teamId === 'string'

const getRandomPlayer = async () => {
	try {
		const { data, error } = await invokeSupabaseFunction('random-player')

		if (error) {
			console.error('Error fetching random player')

			return
		}

		if (!isRandomPlayer(data)) {
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

const isNFLTeam = (maybeNFLTeam: any): maybeNFLTeam is NFLTeam =>
	maybeNFLTeam && (
		typeof maybeNFLTeam.abbreviation === 'string' &&
		typeof maybeNFLTeam.color === 'string' &&
		typeof maybeNFLTeam.displayName === 'string' &&
		typeof maybeNFLTeam.id === 'string' &&
		typeof maybeNFLTeam.location === 'string' &&
		typeof maybeNFLTeam.logo === 'string' &&
		typeof maybeNFLTeam.name === 'string'
	)

const isNFLTeams = (maybeNFLTeams: any): maybeNFLTeams is NFLTeam[] =>
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
	type NFLTeam,
}
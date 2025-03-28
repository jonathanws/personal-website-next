import Email from '@mui/icons-material/Email'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import PlayerLookup from '@/components/demo/jersey-id/PlayerLookup'
import { JerseyIdContextProvider } from '@/contexts/JerseyIdDemoContext'
import { EMAIL_URL } from '@/services/constants'
import DatabaseCacheTable from './DatabaseCacheTable'
import EndpointChip from './EndpointChip'
import Flowchart from './Flowchart'

const ThemedListItem = ({ children }: { children: React.ReactNode }) => <ListItem sx={{ py: 1 }}>
	<ListItemText primaryTypographyProps={{ variant: 'body1' }}>{children}</ListItemText>
</ListItem>

export default function JerseyIdArticle() {
	return (
		<Container sx={{
			mb: 10,
			mt:8,
			pt: {
				md: 4,
				xs: 2,
			},
		}}>
			<Typography variant='h1'>NFL Jersey ID - A full-stack showcase</Typography>

			<JerseyIdContextProvider>
				<PlayerLookup />
			</JerseyIdContextProvider>

			<Typography>Look up any NFL player by their team and jersey number! This latest case study tackles two key challenges:</Typography>
			<List>
				<ThemedListItem>1. Successfully look up active NFL players</ThemedListItem>
				<ThemedListItem>2. Do everything as efficiently as possible, keeping third-party calls to a minimum.</ThemedListItem>
			</List>

			<Typography variant='h2'>The strategy</Typography>

			<Typography>To be that efficient, I made certain optimizations to make things snappy.</Typography>

			<List>
				<ThemedListItem>1. Static-site hosting - The frontend uses Next.js and S3 for a low-impact and quick experience.</ThemedListItem>
				<ThemedListItem>2. Frontend caching - &apos;Recently searched&apos; players are cached at the bottom of the widget, minimizing calls to the backend.</ThemedListItem>
				<ThemedListItem>3. Serverless API - The backend uses Deno edge functions with Supabase for light-weight deployments.</ThemedListItem>
				<ThemedListItem>4. Database caching - Calls made to the third-party integration are cached to a local Postgres table.</ThemedListItem>
			</List>

			<Typography variant='h2'>The backend</Typography>

			<Typography>The backend makes a total of two calls to the third-party integration:</Typography>

			<List>
				<ThemedListItem>1. Fetch information about all teams.</ThemedListItem>
				<ThemedListItem>2. Fetch all players for one team.</ThemedListItem>
			</List>

			<Typography>Doing some quick math, we can figure out that if we made one call to get a list of all the teams, 32 calls to get each team&apos;s players, then with 33 calls we could reproduce the entire league&apos;s roster.  Most teams don&apos;t change that often unless either the trade dealine or the draft is coming up, so if we restricted our code to cache these calls for longer durations during the low-traffic periods we could save our server some work and reduce our dependency on our third-party integration.</Typography>

			<Flowchart sx={{ ' *': { fontFamily: 'Fira Code' }, my: 4 }} />

			<Typography variant='h3'>Caching</Typography>

			<Typography>The cache table for the responses from our third-party integration is pretty straightforward: store the information used to make a call (method/endpoint/params) along with the response (payload), and we&apos;ll be able to return that the next time we request some data instead of making a call.</Typography>

			<DatabaseCacheTable />

			<Typography variant='h3'>Endpoints</Typography>

			<Typography>Supabase has great support for edge functions running Deno, making it a perfect place to host the backend.</Typography>

			<EndpointChip endpoint='/player-by-team-jersey' />
			<Typography>Returns a player given a team, and jersey number.  Note that most teams have gaps in their number assignments, so a player might not exist.</Typography>

			<EndpointChip endpoint='/random-player' />
			<Typography>Returns a random player, randomly!</Typography>

			<EndpointChip endpoint='/teams' />
			<Typography>Returns a list of the 32 NFL teams.  This endpoint populates the team picker dropdown.</Typography>

			<Divider sx={{ my: 4 }} />

			<Typography>And that&apos;s all we need for a speedy full stack demo!  Let me know what you think 👍</Typography>

			<Box display='flex' justifyContent='center' mt={4}>
				<Button
					size='large'
					variant='contained'
					startIcon={<Email />}
					href={EMAIL_URL}
					target='_blank'
				>
					Send Jon an email
				</Button>
			</Box>
		</Container>
	)
}
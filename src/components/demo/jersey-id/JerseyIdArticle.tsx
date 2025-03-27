import Email from '@mui/icons-material/Email'
import KeyRounded from '@mui/icons-material/KeyRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { green, grey } from '@mui/material/colors'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { lighten, useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { Fira_Code } from 'next/font/google'
import { EMAIL_URL } from '@/services/constants'

const tableBordersColor = grey[700]
const firaCode = Fira_Code({
	fallback: ['Courier', 'monospace'],
	subsets: ['latin'],
})

/**
 * UI element acting as headers for the individual endpoint descriptions
 */
const EndpointChip = ({ endpoint }: { endpoint: string }) => {
	const imgSize = '26px'
	const imgStyles = {
		component: 'img' as const,
		sx: {
			display: {
				sm: 'block',
				xs: 'none',
			},
			height: imgSize,
			width: imgSize,
		},
	}

	return (
		<Box mt={5} mb={2}>
			<Box
				display='inline-flex'
				alignItems='center'
				bgcolor='#482880'
				py={1}
				px={3}
				borderRadius={2}
				gap={{ sm: 2, xs: 0 }}
			>
				<Stack gap={1} flexDirection='row'>
					<Box {...imgStyles} src='/deno.svg' alt='deno' />
					<Box {...imgStyles} src='/typescript.svg' alt='typescript' />
				</Stack>

				<Typography
					display='inline'
					fontFamily={firaCode.style.fontFamily}
					fontSize='17px'
					fontWeight={500}
				>
					<b>POST</b> {endpoint}
				</Typography>
			</Box>
		</Box>
	)
}

const Flowchart = () => <Paper sx={{ my: 4 }}>
	<img src='/demo/jersey-id/flowchart.png' alt='Flowchart for the Jersey ID demo' style={{ maxWidth: '100%' }} />
</Paper>

const ThemedListItem = ({ children }: { children: React.ReactNode }) => <ListItem>
	<ListItemText primaryTypographyProps={{ variant: 'body1' }}>{children}</ListItemText>
</ListItem>

export default function JerseyIdArticle() {
	const theme = useTheme()

	const PostgresVariableType = ({ children }: { children: string }) => <Typography
		component='span'
		fontSize='inherit'
		color={theme.palette.text.disabled}
		ml={1}
	>
		{children}
	</Typography>

	/**
	 * Shows a table representing what the cache database table looks like
	 */
	const DatabaseCacheTable = () => {
		const rows = [{
			endpoint: '/nfl-teams',
			expires_at: '2025-04-01 00:00:00.000',
			http: 'GET',
			id: 1,
			params: 'NULL',
			payload: '[{"team":{"id":"22","uid":"..."}}]...',
		},
		{
			endpoint: '/nfl-players',
			expires_at: '2025-04-02 00:00:00.000',
			http: 'GET',
			id: 2,
			params: JSON.stringify({ id: '10' }),
			payload: '["athletes":[{"name":"..."}]]...',
		},
		{
			endpoint: '/nfl-players',
			expires_at: '2025-04-03 00:00:00.000',
			http: 'GET',
			id: 3,
			params: JSON.stringify({ id: '21' }),
			payload: '["athletes":[{"name":"..."}]]...',
		}]

		return (
			<TableContainer component={Paper} sx={{ my: 4 }}>
				<Table size='small' aria-label='database cache table' sx={{
					'th, td': {
						'&:not(:last-child)': { borderRight: `1px solid ${tableBordersColor}` },
						borderBottom: `1px solid ${tableBordersColor}`,
						whiteSpace: 'nowrap',
					},
				}}>
					<TableHead sx={{ background: lighten(theme.palette.background.paper, .1) }}>
						<TableRow>
							<TableCell><KeyRounded sx={{ color: green[500], mr: .5, verticalAlign: 'middle' }}/> id <PostgresVariableType>int4</PostgresVariableType></TableCell>
							<TableCell>http <PostgresVariableType>http_method</PostgresVariableType></TableCell>
							<TableCell>endpoint <PostgresVariableType>varchar</PostgresVariableType></TableCell>
							<TableCell>params <PostgresVariableType>jsonb</PostgresVariableType></TableCell>
							<TableCell>expires_at <PostgresVariableType>timestamp</PostgresVariableType></TableCell>
							<TableCell>payload <PostgresVariableType>jsonb</PostgresVariableType></TableCell>
						</TableRow>
					</TableHead>

					{/* no horizontal border below all the data */}
					<TableBody sx={{ 'tr:last-child': { 'th, td': { borderBottom: 0 } } }}>
						{rows.map((row) => (
							<TableRow key={row.id}>
								<TableCell component='th' scope='row'>{row.id}</TableCell>
								<TableCell>{row.http}</TableCell>
								<TableCell>{row.endpoint}</TableCell>
								<TableCell sx={{ color: row.params === 'NULL' ? theme.palette.text.disabled : 'inherit' }}>{row.params}</TableCell>
								<TableCell>{row.expires_at}</TableCell>
								<TableCell>{row.payload}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		)
	}

	return (
		<Container sx={{ mb: 10 }}>
			<Typography variant='h1'>NFL Jersey ID - A full-stack showcase</Typography>

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

			<Flowchart />

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
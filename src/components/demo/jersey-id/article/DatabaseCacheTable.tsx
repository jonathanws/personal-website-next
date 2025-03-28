import KeyRounded from '@mui/icons-material/KeyRounded'
import { green, grey } from '@mui/material/colors'
import Paper from '@mui/material/Paper'
import { lighten, useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

const tableBordersColor = grey[700]

export default function DatabaseCacheTable() {
	const theme = useTheme()

	const PostgresVariableType = ({ children }: { children: string }) => <Typography
		component='span'
		fontSize='inherit'
		color={theme.palette.text.disabled}
		ml={1}
	>
		{children}
	</Typography>

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
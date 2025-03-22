import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useJsonContext } from './JsonContext'
import JsonInspectorSidebar from './JsonInspectorSidebar'
import JsonSection from './JsonSection'
import SettingsToolbar from './settings/Toolbar'

export default function ButtonAppBar() {
	// TODO: this doesn't format correctly
	// const defaultInput = [
	// 	[
	// 		'b',
	// 		['c'],
	// 	],
	// ]

	return (
		<Box
			sx={{ border: '1px solid teal' }}
			height='100%'
			display='flex'
			flexDirection='column'
		>
			<SettingsToolbar />

			<Paper sx={{
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0,
				display: 'flex',
				flexGrow: 1,
				overflow: 'scroll',
				// overflow: 'auto'
				p: 2,
			}}>

				<JsonInspectorSidebar />

				<Divider orientation='vertical' flexItem sx={{ borderWidth: 1, mx: 1 }} />

				<Box flexDirection='column' flexGrow={1}>
					<JsonSection />
				</Box>
			</Paper>
		</Box>
	)
}
import AppBar from '@mui/material/AppBar'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'
import SettingsToolbarBody from './ToolbarBody'
import SettingsHeader from './ToolbarHeader'

export default function SettingsToolbar() {
	return (
		// <AppBar
	// position='static'
	// position='sticky'
		// 	sx={{ borderRadius: [3, 3, 0, 0].join('px ') }} // top corners
		// 	elevation={3}
		// >
		<Paper
			sx={{ borderRadius: [3, 3, 0, 0].join('px ') }} // top corners
			elevation={3}
		>
			<Toolbar
				sx={{
					flexDirection: 'column',
					gap: 1,
					py: 1,
				}}>
				{/* major actions like reset, paste, save */}
				<SettingsHeader />

				{/* minor actions */}
				<Stack
					gap={1}
					p={1}
					flexGrow={1}
					borderRadius={1}
					width='100%'
					sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
				>
					<SettingsToolbarBody />
				</Stack>
			</Toolbar>
			{/* </AppBar> */}
		</Paper>
	)
}
import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { blueGrey } from '@mui/material/colors'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'

interface Props {
	displayName: string
	focus: boolean
	id: string
	logo: string
}

export default function TeamPickerGridItem({ displayName, focus, id, logo }: Props) {
	const theme = useTheme()
	const setStore = useJerseyIdContext((store) => store.showTeamPicker)[1]

	const isXs = useMediaQuery(theme.breakpoints.down('sm')) // <=600px
	const isSm = useMediaQuery(theme.breakpoints.down('md')) // <=900px (includes 900)
	// everything md or larger we treat as the same

	const getTeamButton = (size: number) => <IconButton
		onClick={() => setStore({
			showTeamPicker: false,
			teamIdForQuery: id,
		})}
		sx={{
			aspectRatio: '1 / 1',
			border: focus ? `2px solid ${blueGrey[200]}` : '2px solid transparent',
			borderRadius: '25%',
			m: 0.5,
			p: 1,
		}}
	>
		<Box
			alt={displayName}
			component='img'
			sx={{
				height: size,
				margin: 0.5,
				width: size,
			}}
			src={logo}
		/>
	</IconButton>

	if (isXs) {
		return getTeamButton(32)
	}

	if (isSm) {
		return getTeamButton(32)
	}

	return getTeamButton(48)
}
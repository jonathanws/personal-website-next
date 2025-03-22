import AddRounded from '@mui/icons-material/AddRounded'
import RemoveRounded from '@mui/icons-material/RemoveRounded'
import Box from '@mui/material/Box'
import { useJsonContext } from '../JsonContext'
import SquareIconButton from './SquareIconButton'
import TooltipWrapper from './TooltipWrapper'

export default function IndentRhythmPicker() {
	const [formatting, setStore] = useJsonContext((store) => store.formatting)

	const onChangeIndentationRhythm = (num: 1 | -1) => {
		const indentRhythm = Math.max(formatting.indentRhythm + num, 1)

		setStore({
			formatting: {
				...formatting,
				indentRhythm,
			},
		})
	}

	return (
		<>
			<TooltipWrapper title='Decrease indent size'>
				<SquareIconButton onClick={() => onChangeIndentationRhythm(-1)}>
					<RemoveRounded />
				</SquareIconButton>
			</TooltipWrapper>

			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				minWidth={40}
				border='1px solid'
				borderColor='divider'
				borderRadius='15%'
				fontWeight={500}
				bgcolor='transparent'
			>
				{formatting.indentRhythm}
			</Box>

			<TooltipWrapper title='Increase indent size'>
				<SquareIconButton onClick={() => onChangeIndentationRhythm(1)}>
					<AddRounded />
				</SquareIconButton>
			</TooltipWrapper>
		</>
	)
}
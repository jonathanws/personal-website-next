import ExpandRounded from '@mui/icons-material/ExpandRounded'
import { useJsonContext } from '../JsonContext'
import SquareIconButton from './SquareIconButton'
import TooltipWrapper from './TooltipWrapper'

export default function ShowLineNumbers() {
	const [renderWhitespace, setStore] = useJsonContext((store) => store.renderWhitespace)

	return (
		<TooltipWrapper title='Render whitespace'>
			<SquareIconButton
				selected={renderWhitespace}
				onClick={() => setStore({ renderWhitespace: !renderWhitespace })}
			>
				<ExpandRounded sx={{ transform: 'rotate(90deg)' }} />
			</SquareIconButton>
		</TooltipWrapper>
	)
}
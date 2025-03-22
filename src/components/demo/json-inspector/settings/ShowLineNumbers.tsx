import FormatListNumberedRounded from '@mui/icons-material/FormatListNumberedRounded'
import SquareIconButton from './SquareIconButton'
import TooltipWrapper from './TooltipWrapper'
import { useJsonContext } from '../JsonContext'

export default function ShowLineNumbers() {
	const [showLineNumbers, setStore] = useJsonContext((store) => store.showLineNumbers)

	return (
		<TooltipWrapper title='Show line numbers'>
			<SquareIconButton
				selected={showLineNumbers}
				onClick={() => setStore({ showLineNumbers: !showLineNumbers })}
			>
				<FormatListNumberedRounded />
			</SquareIconButton>
		</TooltipWrapper>
	)
}
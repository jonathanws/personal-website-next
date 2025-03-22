import InfoRounded from '@mui/icons-material/InfoRounded'
import SquareIconButton from './SquareIconButton'
import TooltipWrapper from './TooltipWrapper'
import { useJsonContext } from '../JsonContext'

export default function ShowMetaText() {
	const [showMetaText, setStore] = useJsonContext((store) => store.showMetaText)

	return (
		<TooltipWrapper title='Show meta text'>
			<SquareIconButton
				onClick={() => setStore({ showMetaText: !showMetaText })}
				selected={showMetaText}
			>
				<InfoRounded />
			</SquareIconButton>
		</TooltipWrapper>
	)
}
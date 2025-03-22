import { SpaceBarRounded } from '@mui/icons-material'
import KeyboardTabRounded from '@mui/icons-material/KeyboardTabRounded'
import { useJsonContext } from '../JsonContext'
import SquareIconButton from './SquareIconButton'
import TooltipWrapper from './TooltipWrapper'
import { IndentChar, indentCharactersMap } from '../services/formatting'

interface IndentWithProps {
	character: IndentChar
}

export default function ShowLineNumbers({ character }: IndentWithProps) {
	const [formatting, setStore] = useJsonContext((store) => store.formatting)
	const tooltipTitle = `Indent with ${character === indentCharactersMap.space ? 'space' : 'tabs'}`

	return (
		<TooltipWrapper title={tooltipTitle}>
			<SquareIconButton
				selected={character === formatting.indentCharacter}
				onClick={() => setStore({
					formatting: {
						...formatting,
						indentCharacter: character,
					},
				})}
			>
				{character === indentCharactersMap.space ? <SpaceBarRounded /> : <KeyboardTabRounded /> }
			</SquareIconButton>
		</TooltipWrapper>
	)
}
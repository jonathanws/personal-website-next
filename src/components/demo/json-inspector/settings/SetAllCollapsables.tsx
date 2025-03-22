import UnfoldLessRounded from '@mui/icons-material/UnfoldLessRounded'
import UnfoldMoreRounded from '@mui/icons-material/UnfoldMoreRounded'
import { memo } from 'react'
import { useJsonContext } from '../JsonContext'
import SquareIconButton from './SquareIconButton'
import TooltipWrapper from './TooltipWrapper'

interface SetAllCollapsablesProps {
	title: 'Expand' | 'Collapse'
}

export default memo(function SetAllCollapsables({ title }: SetAllCollapsablesProps) {
	const [areas, setStore] = useJsonContext(({ areas }) => areas)

	return (
		<TooltipWrapper title={`${title} all section`}>
			<SquareIconButton onClick={() => setStore({
				areas: areas.map((a) => ({
					...a, // TODO: this line might not be needed
					expanded: title === 'Expand' ? true : false,
				})),
			})}>
				{ title === 'Expand' ? <UnfoldMoreRounded /> : <UnfoldLessRounded /> }
			</SquareIconButton>
		</TooltipWrapper>
	)
})

// export default memo(() => )

// export default function SetAllCollapsables() {
// 	const { dispatch } = useJsonContext()

// 	return memo(
// 		function MemoSetAllCollapsables({ title }: SetAllCollapsablesProps) {
// 			return (
// 				<TooltipWrapper title={`${title} all sections`}>
// 					<SquareIconButton onClick={() => dispatch({
// 						payload: title === 'Expand' ? 'expanded' : 'collapsed',
// 						type: 'setAllAreasExpandability',
// 					})}>
// 						{ title === 'Expand' ? <UnfoldMoreRounded /> : <UnfoldLessRounded /> }
// 					</SquareIconButton>
// 				</TooltipWrapper>
// 			)
// 		}
// 	)
// }
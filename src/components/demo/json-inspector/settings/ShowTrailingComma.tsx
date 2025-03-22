import SvgIcon from '@mui/material/SvgIcon'
import { useJsonContext } from '../JsonContext'
import SquareIconButton from './SquareIconButton'
import TooltipWrapper from './TooltipWrapper'

export default function ShowLineNumbers() {
	// TODO: fix trailing comma
	const [showTrailingComma, setStore] = useJsonContext((store) => store.trailingComma)

	return (
		<TooltipWrapper title='Trailing comma'>
			<SquareIconButton
				selected={showTrailingComma}
				onClick={() => setStore({ trailingComma: !showTrailingComma })}
			>
				<SvgIcon viewBox='0 0 24 24'>
					<path d='m 12,5 a 5,5 0 0 0 -5,5 5,5 0 0 0 5,5 5,5 0 0 0 1,-0.113281 c -0.05304,1.682676 -0.466694,2.613178 -1.283203,3.429687 v 0.002 A 0.40000001,0.40000001 0 0 0 11.599609,18.599609 0.40000001,0.40000001 0 0 0 12,19 0.40000001,0.40000001 0 0 0 12.08398,18.9902 0.40000001,0.40000001 0 0 0 12.13476,18.97457 C 13.174111,18.678987 17,15.407581 17,10 A 5,5 0 0 0 12,5 Z' />
				</SvgIcon>
			</SquareIconButton>
		</TooltipWrapper>
	)
}
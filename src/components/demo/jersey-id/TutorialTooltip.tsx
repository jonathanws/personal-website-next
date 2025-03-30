import ClickAwayListener from '@mui/material/ClickAwayListener'
import { blue } from '@mui/material/colors'
import { alpha } from '@mui/material/styles'
import Tooltip, { TooltipProps } from '@mui/material/Tooltip'
import { useState } from 'react'
import { useJerseyIdContext } from '@/contexts/JerseyIdDemoContext'

interface TutorialTooltipProps {
	children: TooltipProps['children']
	placement?: TooltipProps['placement']
	title: string
}

export default function TutorialTooltip({ children, placement = 'top-end', title }: TutorialTooltipProps) {
	const [showTutorialClickRandomPlayerButton, setStore] = useJerseyIdContext((state) => state.showTutorialClickRandomPlayerButton )
	const [loading] = useJerseyIdContext((state) => state.loading)
	const [listenForClickAways, setListenForClickAways] = useState(true)
	const backgroundColor = alpha(blue[700], 0.95)

	const onClickAway = () => {
		setStore({ showTutorialClickRandomPlayerButton: false })
		setListenForClickAways(false)
	}

	return (
		<ClickAwayListener onClickAway={onClickAway} mouseEvent={listenForClickAways ? 'onClick' : false}>
			<Tooltip
				open={showTutorialClickRandomPlayerButton && !loading}
				title={title}
				arrow
				placement={placement}
				componentsProps={{
					tooltip: {
						sx: {
							'& .MuiTooltip-arrow': { color: backgroundColor },
							background: backgroundColor,
							fontSize: '1rem',
							px: 3,
							py: 1,
						},
					},
				}}
			>
				{children}
			</Tooltip>
		</ClickAwayListener>
	)
}
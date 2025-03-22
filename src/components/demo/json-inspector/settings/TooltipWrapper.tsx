import Tooltip from '@mui/material/Tooltip'

interface TooltipWrapperProps {
	children : React.ReactNode
	title: string
}

export default function TooltipWrapper({ title, children }: TooltipWrapperProps) {
	// div used for workaround regarding failed refs for using custom components in tooltips
	// https://stackoverflow.com/a/63521049

	return <Tooltip title={title}>
		<div>{children}</div>
	</Tooltip>
}
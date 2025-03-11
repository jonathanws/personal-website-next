import Paper, { PaperProps } from '@mui/material/Paper'
import { useEffect, useRef, useState } from 'react'

interface Props extends PaperProps {
	background: string
	borderRadius: number
	children: React.ReactNode
	open: boolean
	zIndex: number
}

/**
 * Collapsable components meant to hide underneath the component above them
 */
export default function CollapsableOverlapPaper({ background, borderRadius, children, open, sx, zIndex, ...rest }: Props) {
	const contentRef = useRef<HTMLDivElement>(null)
	const [contentHeight, setContentHeight] = useState(0)

	useEffect(() => {
		if (open && contentRef.current) {
			setContentHeight(contentRef.current.scrollHeight)
		}
	}, [open])

	return (
		<Paper
			{...rest}
			ref={contentRef}
			sx={{
				...sx,
				background,
				borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
				maxHeight: open ? `${contentHeight}px` : `${borderRadius * 2}px`,
				mt: `-${borderRadius * 2}px`,
				overflow: 'hidden',
				position: 'relative',
				pt: `${borderRadius * 2}px`,
				transition: 'max-height 0.2s ease-in-out',
				zIndex,
			}}
		>
			{children}
		</Paper>
	)
}
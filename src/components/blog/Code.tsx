import { ContentCopy } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { alpha, darken, lighten, styled, useTheme } from '@mui/material/styles'
import copy from 'clipboard-copy'
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Props {
	highlightLines?: number[]
	language:
		| 'bash'
		| 'typescript'
	text: string[]
}

// because you can't configure indentation to use tabs...
export const TAB = '	'
export const FOUR_SPACES = '    '

// background color of the code blocks.  Unsure how to import, so duplicated here
const codeBlockBackgroundColor = 'rgb(40, 44, 52)'

// IconButton component initialized with styles
const StyledIconButton = styled(IconButton)<IconButtonProps>(() => ({
	'&:hover': {
		background: lighten(codeBlockBackgroundColor, 0.3),
	},
	background: darken(`${codeBlockBackgroundColor}`, 0.3),
	borderRadius: '6px',
	color: 'white',
	padding: '8px',
	position: 'absolute',
	right: '10px',
	top: '10px',
}))

export default function Code({ highlightLines, language, text }: Props) {
	const [showSuccessIcon, setShowSuccessIcon] = useState(false)
	const theme = useTheme()
	const onCopyClick = () => {
		copy(text.join('\n'))
		setShowSuccessIcon(true)
		setTimeout(() => setShowSuccessIcon(false), 1_500)
	}

	return (
		<div style={{ maxWidth: 'calc(100vw - 5vw)', position: 'relative' }}>
			<Tooltip
				title="Copy"
				placement="left"
			>
				<StyledIconButton
					aria-label="copy"
					onClick={onCopyClick}
					size='small'
				>
					{showSuccessIcon ? <CheckIcon fontSize='inherit' /> : <ContentCopy fontSize='inherit' />}
				</StyledIconButton>
			</Tooltip>
			<SyntaxHighlighter
				customStyle={{
					borderRadius: 6,
					lineHeight: '1.75rem',
					marginBottom: 16,
					maxWidth: '100vw',
					padding: 16,
				}}
				language={language}
				lineProps={(line: number) => highlightLines?.includes(line)
					? ({ style: { backgroundColor: alpha(theme.palette.primary.main, 0.4) } })
					: ({})
				}
				showLineNumbers={true}
				style={atomOneDark}
				wrapLines
			>
				{
					text
						.map((t) => t.replaceAll(TAB, FOUR_SPACES))
						.join('\n')
				}
			</SyntaxHighlighter>
		</div>
	)
}
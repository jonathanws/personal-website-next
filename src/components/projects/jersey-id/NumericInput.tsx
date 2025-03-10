import { SxProps, Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

interface Props {
	onChange: (c: string) => void
	onEnter?: () => void
	sx?: SxProps<Theme>
	value: string
}

export default function NumericInput({ onChange, onEnter, sx, value }: Props) {
	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		// only numbers are allowed
		if (!/^\d*$/.test(target.value)) {
			return
		}

		onChange(target.value)
	}

	const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (onEnter && event.key === 'Enter') {
			event.preventDefault() // prevent submitting entire form if inside a form

			if (event.target instanceof HTMLInputElement) {
				event.target.blur() // dismiss keyboard on mobile
			}

			onEnter()
		}
	}

	return (
		<TextField
			value={value}
			onChange={handleChange}
			onKeyDown={handleKeydown}
			inputProps={{
				inputMode: 'numeric',
				maxLength: 2,
				pattern: '[0-9]*',
				style: { MozAppearance: 'textfield' },
			}}
			sx={{
				...sx,
				'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
					display: 'none',
				},
			}}
		/>
	)
}
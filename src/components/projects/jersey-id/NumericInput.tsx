import TextField from '@mui/material/TextField'

interface Props {
	onChange: (c: string) => void
	onEnter?: () => void
	value: string
}

export default function NumericInput({ onChange, onEnter, value }: Props) {
	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		// only numbers are allowed
		if (!/^\d*$/.test(target.value)) {
			return
		}

		onChange(target.value)
	}

	const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (onEnter && event.key === 'Enter') {
			console.log('entered')
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
				'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
					display: 'none',
				},
			}}
		/>
	)
}
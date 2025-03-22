import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'
import { useJsonContext } from '../JsonContext'
import { themeMap } from '../services/settings'

export default function ShowLineNumbers() {
	const [theme, setStore] = useJsonContext((store) => store.theme)

	const onChange = (event: SelectChangeEvent<string>) => {
		setStore({ theme: event.target.value }) // as keyof typeof themeMap
	}

	return (
		<Select
			value={theme}
			size='small'
			// onChange={(event) => dispatch({ type: 'changeTheme', payload: event.target.value })}
			onChange={onChange}
		>
			{Object.keys(themeMap).map((k) => <MenuItem key={k} value={k}>{k}</MenuItem>)}
		</Select>
	)
}
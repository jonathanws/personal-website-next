const SettingsContext = createContext()

const Parent = () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<SettingsContext.Provider value={{ state, dispatch }}>
			<Level1 />
		</SettingsContext.Provider>
	)
}

const Level1 = () => <Level2 />
const Level2 = () => <Level3 />
const Level3 = () => <DeepChild />

const DeepChild = () => {
	const { dispatch } = useContext(SettingsContext)
	return <button onClick={() => dispatch({ type: "toggleDarkMode" })}>Toggle Dark Mode</button>
}

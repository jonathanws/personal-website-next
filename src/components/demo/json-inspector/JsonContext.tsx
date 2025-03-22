// import React, { createContext, useContext, useReducer } from 'react'

import createFastContext from './FastContext'
import { CollapsableArea, getTokenLinesAndCollapsableAreas, ReactLine } from './json'
import { defaultSettings, type Settings } from './services/settings'

const defaultJson = [
	[
		'welcome!', 'Inspect your JSON code with the JSON Inspector!',
	],
	{
		instructions: {
			message: 'Use the buttons at the top to paste your code, or play with some examples',
		},
	},
]

type State =
	Settings
	& { areas: CollapsableArea[] } // collapsable areas in the json.  used by sidebar to show/hide lines
	& { tokenLines: ReactLine[] } // the json displayed in the main area

const initialState: State = {
	...defaultSettings,
	...(getTokenLinesAndCollapsableAreas(defaultJson, defaultSettings.formatting)),
}

const { Provider: JsonContextProvider, useStore: useJsonContext } = createFastContext<State>(initialState)


// type Action =
// 	| { type: 'toggleLineNumber' }
// 	| { type: 'toggleTrailingComma' }

// const reducer = (state: State, action: Action): State => {
// 	// 	// TODO: don't set state if state is the same

// 	switch (action.type) {
// 		case 'toggleLineNumber':
// 			return {
// 				...state,
// 				showLineNumbers: !state.showLineNumbers,
// 			}
// 		case 'toggleTrailingComma':
// 			return {
// 				...state,
// 				trailingComma: !state.trailingComma,
// 			}
// 		default:
// 			return state
// 	}
// }

// const JsonContext = createContext<{
// 	state: State
// 	dispatch: React.Dispatch<Action>
// } | null>(null)

// /**
//  * component that wraps a top-level component to give context to all it's children
//  */
// const JsonContextProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [state, dispatch] = useReducer(reducer, initialState)

// 	return (
// 		<JsonContext.Provider value={{ state, dispatch }}>
// 			{children}
// 		</JsonContext.Provider>
// 	)
// }

// /**
//  * used by the children components to grab the context
//  */
// const useJsonContext = () => {
// 	const context = useContext(JsonContext)

// 	if (!context) {
// 		throw new Error('useJsonContext must be used within a SettingsContextProvider')
// 	}

// 	return context
// }

export {
// 	JsonContext,
	JsonContextProvider,
	useJsonContext,
}
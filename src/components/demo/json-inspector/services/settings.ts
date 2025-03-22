import { cyan, grey, lightGreen, orange, pink, purple, red, yellow } from '@mui/material/colors'
import { Theme as MaterialUiTheme, SxProps } from '@mui/material/styles'
import { defaultFormatRules, Formatting } from './formatting'

interface Settings {
	formatting: Formatting
	renderWhitespace: boolean
	showLineNumbers: boolean
	showMetaText: boolean
	theme: ThemeName
	trailingComma: boolean
}

const defaultSettings: Settings = {
	formatting: defaultFormatRules,
	renderWhitespace: true,
	showLineNumbers: true,
	showMetaText: true,
	theme: 'default',
	trailingComma: true,
}

type ReactTokenType =
	| 'boolean'
	| 'comma'
	| 'curly'
	| 'key'
	| 'meta'
	| 'null'
	| 'number'
	| 'semi'
	| 'square'
	| 'string'
	| 'whitespace'

interface Theme {
	booleanStyles: SxProps<MaterialUiTheme>
	commaStyles: SxProps<MaterialUiTheme>
	curlyStyles: SxProps<MaterialUiTheme>
	keyStyles: SxProps<MaterialUiTheme>
	nullStyles: SxProps<MaterialUiTheme>
	numberStyles: SxProps<MaterialUiTheme>
	semiStyles: SxProps<MaterialUiTheme>
	squareStyles: SxProps<MaterialUiTheme>
	stringStyles: SxProps<MaterialUiTheme>

	backgroundStyles: SxProps<MaterialUiTheme>
}

const defaultTheme: Theme = {
	backgroundStyles: {},
	booleanStyles: { color: cyan[300] },
	commaStyles: { color: grey[300] },
	curlyStyles: { color: yellow[300] },
	keyStyles: { color: red[300] },
	nullStyles: { color: pink[300] },
	numberStyles: { color: orange[300] },
	semiStyles: { color: grey[300] },
	squareStyles: { color: purple[300] },
	stringStyles: { color: lightGreen[300] },
}
const oopsAllOrange: Theme = {
	backgroundStyles: {},
	booleanStyles: { color: orange[100] },
	commaStyles: { color: orange[200] },
	curlyStyles: { color: orange[300] },
	keyStyles: { color: orange[400] },
	nullStyles: { color: orange[500] },
	numberStyles: { color: orange[600] },
	semiStyles: { color: orange[700] },
	squareStyles: { color: orange[800] },
	stringStyles: { color: orange[900] },
}

const themeMap: Record<string, Theme> = {
	default: defaultTheme,
	oopsAllOrange: oopsAllOrange,
} as const
type ThemeName = keyof typeof themeMap

const getThemeTypeFromReactType = (type: Exclude<ReactTokenType, 'meta' | 'whitespace'>): keyof Theme => {
	const map: Record<Exclude<ReactTokenType, 'meta' | 'whitespace'>, keyof Theme> = {
		boolean: 'booleanStyles',
		comma: 'commaStyles',
		curly: 'curlyStyles',
		key: 'keyStyles',
		null: 'nullStyles',
		number: 'numberStyles',
		semi: 'semiStyles',
		square: 'squareStyles',
		string: 'stringStyles',
	}

	return map[type]
}

const getStylesFor = (type: keyof Theme, theme: Settings['theme']) => {
	return themeMap[theme][type]
}

export {
	defaultSettings,
	getStylesFor,
	getThemeTypeFromReactType,
	themeMap,
	type ReactTokenType,
	type Settings,
}

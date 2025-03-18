import { cyan, grey, lightGreen, orange, pink, purple, red, yellow } from '@mui/material/colors'
import { Theme as MaterialUiTheme, SxProps } from '@mui/material/styles'

interface Settings {
	indentation: {
		char: IndentChar
		rhythm: number
	}
	renderWhitespace: boolean
	showLineNumbers: boolean
	showMetaText: boolean
	theme: ThemeName
	trailingComma: boolean
}

const reactTokenTypes = [
	'boolean',
	'comma',
	'curly',
	'key',
	'meta',
	'null',
	'number',
	'semi',
	'square',
	'string',
	'whitespace',
] as const
type ReactTokenType = typeof reactTokenTypes[number]

const indentCharactersMap = {
	space: ' ',
	tab: '	',
} as const
type IndentChar = keyof typeof indentCharactersMap

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
	booleanStyles: { color: cyan[300] },
	commaStyles: { color: grey[300] },
	curlyStyles: { color: yellow[300] },
	keyStyles: { color: red[300] },
	nullStyles: { color: pink[300] },
	numberStyles: { color: orange[300] },
	semiStyles: { color: grey[300] },
	squareStyles: { color: purple[300] },
	stringStyles: { color: lightGreen[300] },
	backgroundStyles: {},
}
const oopsAllOrange: Theme = {
	booleanStyles: { color: orange[100] },
	commaStyles: { color: orange[200] },
	curlyStyles: { color: orange[300] },
	keyStyles: { color: orange[400] },
	nullStyles: { color: orange[500] },
	numberStyles: { color: orange[600] },
	semiStyles: { color: orange[700] },
	squareStyles: { color: orange[800] },
	stringStyles: { color: orange[900] },
	backgroundStyles: {},
}

const themeMap: Record<string, Theme> = {
	default: defaultTheme,
	oopsAllOrange: oopsAllOrange,
}
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

const getStylesFor = (type: keyof Theme, settings: Settings) => {
	const currentTheme = themeMap[settings.theme]
	
	return currentTheme[type]
}

export {
	getStylesFor,
	getThemeTypeFromReactType,
	indentCharactersMap,
	themeMap,
	type ReactTokenType,
	type Settings
}

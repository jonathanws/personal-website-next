import { JsonTokenType } from '../json'
import { indentCharactersMap, IndentChar } from './settings'

// TODO: consider sending all tokens to each format function.
// see if we can correctly format
// [
//  'string',
//  ['string]
// ]
type FormatFunction = (type: JsonTokenType, prevType: JsonTokenType | undefined) => boolean

// Adds both newlines and indentation

const newlineOnlyWhenPrintingStructure: FormatFunction = (...args) => {
	const [type, prevType] = args

	switch (type) {
		case 'curlyOpen':
		case 'squareOpen':
			return prevType ? ['squareOpen', 'comma'].includes(prevType) : false
		case 'curlyClose':
			return prevType ? ['squareClose', 'curlyClose', 'value'].includes(prevType) : false
		case 'squareClose':
			return prevType ? ['squareClose', 'curlyClose'].includes(prevType) : false
		case 'key':
			return true
		default:
			return false
	}
}

// Adds spaces after text

const spacesAfterSemicolons: FormatFunction = (...args) => {
	const [type] = args

	return type === 'semi'
}

// Adds spaces before text

const spacesBeforeValuesAndCommas: FormatFunction = (...args) => {
	const [type, prevType] = args

	return prevType
		? type === 'value' && prevType === 'comma'
		: false
}

// Decrements levels

const decrementAfterBracketClose: FormatFunction = (...args) => {
	const [type] = args

	return ['curlyClose', 'squareClose'].includes(type)
}

// Increments levels

const incrementAfterBracketOpen: FormatFunction = (...args) => {
	const [type] = args

	return ['curlyOpen', 'squareOpen'].includes(type)
}

interface Formatting {
	addNewLineAndIndentation: FormatFunction
	addSpaceAfter: FormatFunction
	addSpaceBefore: FormatFunction
	decrementsLevel: FormatFunction
	generateMetaTokens: boolean
	incrementsLevel: FormatFunction
	indentCharacter: IndentChar
	indentRhythm: number
}

const defaultFormatRules: Formatting = {
	addNewLineAndIndentation: newlineOnlyWhenPrintingStructure,
	addSpaceAfter: spacesAfterSemicolons,
	addSpaceBefore: spacesBeforeValuesAndCommas,
	decrementsLevel: decrementAfterBracketClose,
	generateMetaTokens: true,
	incrementsLevel: incrementAfterBracketOpen,
	indentCharacter: indentCharactersMap.tab,
	indentRhythm: 4,
}

export {
	defaultFormatRules,
	type Formatting,
}
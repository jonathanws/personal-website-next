import { ReactTokenType } from './services/settings'

type JsonTokenType =
	| 'comma'
	| 'curlyClose'
	| 'curlyOpen'
	| 'key'
	| 'semi'
	| 'squareClose'
	| 'squareOpen'
	| 'value'

interface BaseToken<T extends string> {
	text: string
	type: T
	metadata: {
		arrayLength?: number
	}
}

type JsonToken = BaseToken<JsonTokenType> // tokens understood by the json parser
type ReactToken = BaseToken<ReactTokenType> // tokens understood by react

type ReactLine = ReactToken[]

const createJsonToken = (text: string, incomingType?: JsonTokenType): JsonToken => {
	const map: Record<string, JsonTokenType> = {
		',': 'comma',
		':': 'semi',
		'"': 'value',
		'[': 'squareOpen',
		']': 'squareClose',
		'{': 'curlyOpen',
		'}': 'curlyClose',
	}

	const type = incomingType ? incomingType : map[text]

	if (!type) {
		throw new Error()
	}

	const metadata = type === 'squareOpen' ? { arrayLength: 0 } : {}

	return {
		metadata,
		text,
		type,
	}
}

// state placeholders for building booleans/strings/etc
interface ReduceTokenBuilder {
	buildingDataType: 'boolean' | 'null' | 'number' | 'string' | ''
	tokens: JsonToken[]
}

const getTokens = (data: unknown) => {
	const jsonCharArray = JSON.parse(JSON.stringify(data))
		? JSON.stringify(data).split('')
		: []

	const tokens = jsonCharArray.reduce<ReduceTokenBuilder>(
		(acc, text, index) => {
			// helper function
			const addToLastToken = (s: string) => {
				const lastToken = acc.tokens[acc.tokens.length - 1]
				lastToken.text = `${lastToken.text}${s}`
			}

			// string building logic is isolated at the top due to just how many characters
			// can go into a string.  We really rely on " telling us when to start/stop.
			if (text === '"') {
				// check to make sure that the string isn't escaped
				if (acc.buildingDataType === 'string') {
					// if previous character is not escaped, finish building string
					if (!acc.tokens[acc.tokens.length - 1].text.endsWith('\\')) {
						acc.buildingDataType = ''
					}
				} else if (acc.buildingDataType === '') {
					acc.buildingDataType = 'string'
				}

				acc.buildingDataType === 'string'
					? acc.tokens.push(createJsonToken(text))
					: addToLastToken(text)

				return acc
			}

			// are we currently in the middle of building something?
			switch (acc.buildingDataType) {
				case 'string':
					addToLastToken(text)

					return acc
				case 'boolean':
					if (['a', 'e', 'f', 'l', 'r', 's', 't', 'u'].includes(text)) {
						addToLastToken(text)

						return acc
					}

					acc.buildingDataType = ''
					break
				case 'number':
					if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(text)) {
						addToLastToken(text)

						return acc
					}

					acc.buildingDataType = ''
					break
				case 'null':
					if (['n', 'u', 'l'].includes(text)) {
						addToLastToken(text)
						return acc
					}

					acc.buildingDataType = ''
					break
			}

			switch (text) {
				case '{': case '}': case '[': case ']': case ',':
					acc.tokens.push(createJsonToken(text))

					return acc
				case ':':
					if (index !== 0 && acc.tokens[acc.tokens.length - 1]?.type === 'value') {
						acc.tokens[acc.tokens.length - 1].type = 'key'
					}

					acc.tokens.push(createJsonToken(text))

					return acc
				// start building a boolean
				case 'f': case 't':
					acc.buildingDataType = 'boolean'
					acc.tokens.push(createJsonToken(text, 'value'))

					return acc
				// start building null
				case 'n':
					acc.buildingDataType = 'null'
					acc.tokens.push(createJsonToken(text, 'value'))

					return acc
				// start building number
				case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '-':
					acc.buildingDataType = 'number'
					acc.tokens.push(createJsonToken(text, 'value'))

					return acc
				default:
					console.log('fail', text)
					throw new Error()
			}

			return acc
		},
		// initialization values
		{
			buildingDataType: '',
			tokens: [],
		}
	).tokens

	// generate metadata for some tokens

	const stack: Extract<JsonTokenType, 'squareOpen' | 'squareClose' | 'curlyOpen' | 'curlyClose' | 'value'>[] = []
	const arrayStartIndexes: number[] = []

	// helper function
	const incrementParentIfNeeded = () => {
		if (stack[stack.length - 1] !== 'squareOpen') {
			return
		}

		const lastArrayIndex = arrayStartIndexes[arrayStartIndexes.length - 1]
		const token = tokens[lastArrayIndex]

		if (!token.metadata.arrayLength) {
			token.metadata.arrayLength = 0
		}

		token.metadata.arrayLength += 1
	}

	tokens.forEach(({ type }, index) => {
		switch (type) {
			case 'squareOpen':
				arrayStartIndexes.push(index)
				stack.push(type)

				break
			case 'curlyOpen':
				stack.push(type)

				break
			case 'value':
				incrementParentIfNeeded()

				break
			case 'curlyClose':
				stack.splice(-1) // will always reference curlyOpen
				incrementParentIfNeeded()

				break
			case 'squareClose':
				stack.splice(-1) // will always reference squareOpen
				arrayStartIndexes.splice(-1)
				incrementParentIfNeeded()

				break
		}
	})

	return tokens
}

type FormatFunction = (type: JsonTokenType, prevType: JsonTokenType | undefined) => boolean

interface Formatting {
	addNewLineAndIndentation: FormatFunction
	addSpaceAfter: FormatFunction
	addSpaceBefore: FormatFunction
	decrementsLevel: FormatFunction
	incrementsLevel: FormatFunction
	generateMetaTokens: boolean
	indentCharacter: '	' | ' ' // tab | space
	indentRhythm: number
}

const getFormattedTokens = (tokens: JsonToken[], formatting: Formatting) => {
	const {
		addNewLineAndIndentation,
		addSpaceAfter,
		addSpaceBefore,
		decrementsLevel,
		incrementsLevel,
		indentCharacter,
		indentRhythm,
		generateMetaTokens,
	} = formatting
	let indentLevel = 0
	let currentLine = 0

	const lines: ReactLine[] = []

	// helper function
	const goToNextLine = () => {
		currentLine += 1
		lines[currentLine] = []
	}

	// helper function
	const addMetadata = (line: ReactLine) => {
		if (!generateMetaTokens) {
			return
		}

		// there should only be one token with arrayLength per line
		const tokenWithArrayLength = line.find((token) => token.metadata.arrayLength)

		if (tokenWithArrayLength) {
			line.push({
				metadata: {},
				text: `${tokenWithArrayLength.metadata.arrayLength} ite${tokenWithArrayLength.metadata.arrayLength === 1 ? 'm' : 'ms'}`,
				type: 'meta',
			})
		}
	}

	// helper function
	const addToLine = (text: string, type: ReactTokenType | 'whitespace', metadata: { arrayLength?: number }) => {
		// root-most element
		if (!lines.length) {
			lines.push([])
		}

		// push to most recent line
		lines[lines.length - 1].push({ metadata, text, type })
	}

	// helper function.  Converts json types into react types
	const getTextType = (text: string, type: JsonTokenType): ReactTokenType => {
		switch (type) {
			case 'comma':
			case 'key':
			case 'semi':
				return type
			case 'curlyOpen':
			case 'curlyClose':
				return 'curly'
			case 'squareOpen':
			case 'squareClose':
				return 'square'
			case 'value':
				if (text.startsWith('"')) {
					return 'string'
				} else if (text === 'true' || text === 'false') {
					return 'boolean'
				} else if (text === 'null') {
					return 'null'
				} else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].some((num) => text.startsWith(num))) {
					return 'number'
				}

				// this should never get here
				return 'string'
				console.error('fail')
		}
	}

	// convert a 1-dimensional array of all tokens to a 2-dimensional
	// array of lines that each have an array of tokens to display
	tokens.map(({ metadata, text, type }, index) => {
		const prev = tokens[index - 1]

		if (decrementsLevel(type, prev?.type)) {
			indentLevel -= 1
		}

		if (addNewLineAndIndentation(type, prev?.type)) {
			addMetadata(lines[currentLine])
			goToNextLine()

			// no need to include whitespace if on a root-level element
			if (indentLevel) {
				addToLine(indentCharacter.repeat(indentLevel * indentRhythm), 'whitespace', metadata)
			}
		}

		if (incrementsLevel(type, prev?.type)) {
			indentLevel += 1
		}

		const temp = [
			addSpaceBefore(type, prev?.type) ? ' ' : '',
			text,
			addSpaceAfter(type, prev?.type) ? ' ': '',
		].join('')

		addToLine(temp, getTextType(text, type), metadata)

		// if we went through all the tokens and everything fits on one line, add metadata
		if (index === tokens.length - 1 && currentLine === 0) {
			addMetadata(lines[currentLine])
		}
	})

	return lines
}

const defaultFormatRules: Formatting = {
	addNewLineAndIndentation: (type: JsonTokenType, prevType: JsonTokenType | undefined) => {
		switch (type) {
			case 'curlyOpen':
				return prevType ? ['squareOpen', 'comma'].includes(prevType) : false
			case 'curlyClose':
				return prevType ? ['squareClose', 'curlyClose', 'value'].includes(prevType) : false
			case 'squareOpen':
				return prevType ? ['squareOpen', 'comma'].includes(prevType) : false
			case 'squareClose':
				return prevType ? ['squareClose', 'curlyClose'].includes(prevType) : false
			case 'key':
				return true
			default:
				return false
		}
	},
	addSpaceAfter: (type: JsonTokenType, prevType: JsonTokenType | undefined) => type === 'semi',
	addSpaceBefore: (type: JsonTokenType, prevType: JsonTokenType | undefined) => prevType ? type === 'value' && prevType === 'comma' : false,
	decrementsLevel: (type: JsonTokenType, prevType: JsonTokenType | undefined) => ['curlyClose', 'squareClose'].includes(type),
	incrementsLevel: (type: JsonTokenType, prevType: JsonTokenType | undefined) => ['curlyOpen', 'squareOpen'].includes(type),
	indentCharacter: '\t',
	indentRhythm: 1,
	generateMetaTokens: true,
}

export {
	defaultFormatRules,
	getFormattedTokens,
	getTokens,
	type ReactLine,
	type ReactToken,
}

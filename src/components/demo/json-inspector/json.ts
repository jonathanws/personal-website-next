import { Formatting, indentCharactersMap } from './services/formatting'
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

/**
 * First step of preparing use input for tokenization.  Validates user input
 */
const getJsonCharArray = (data: unknown): string[] => {
	if (data === null) {
		return []
	}

	if (typeof data !== 'string' && typeof data !== 'object') {
		return []
	}

	// validity check
	try {
		if (typeof data === 'string') {
			JSON.parse(data)
		} else if (typeof data === 'object') {
			JSON.parse(JSON.stringify(data))
		}
	} catch (e) {
		console.error('could not parse incoming data', e)
	}

	if (typeof data === 'string') {
		const temp = JSON.stringify(JSON.parse(data))

		return temp ? temp.split('') : []
	} else if (typeof data === 'object') {
		return JSON.stringify(data).split('')
	}

	console.error('neither string nor object', [])

	return []
}

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

// // all the different characters that signal we should start building X
// const startingBooleanCharacters = new Set(['f', 't'])
// const startingNumberCharacters = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'])
//	null always only starts with 'n', no set needed

// when building values, what characters go into different types?
const booleanBodyCharacters = new Set(['a', 'e', 'f', 'l', 'r', 's', 't', 'u'])
const numberBodyCharacters = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'])
const nullBodyCharacters = new Set(['n', 'u', 'l'])

const getTokens = (data: unknown) => {
	// state placeholders for building booleans/strings/etc
	interface ReduceTokenBuilder {
		buildingDataType: 'boolean' | 'null' | 'number' | 'string' | ''
		tokens: JsonToken[]
	}

	const { tokens } = getJsonCharArray(data).reduce<ReduceTokenBuilder>(
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
					if (booleanBodyCharacters.has(text)) {
						addToLastToken(text)

						return acc
					}

					acc.buildingDataType = ''

					break
				case 'number':
					if (numberBodyCharacters.has(text)) {
						addToLastToken(text)

						return acc
					}

					acc.buildingDataType = ''

					break
				case 'null':
					if (nullBodyCharacters.has(text)) {
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
	)

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
				addToLine(
					indentCharacter.repeat(indentCharacter === indentCharactersMap.space
						? indentLevel * indentRhythm
						: indentLevel
					),
					'whitespace',
					metadata,
				)
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

// For the collapable code buttons in the sidebar
interface CollapsableArea {
	expanded: boolean
	lineStart: number
	lineEnd: number
}

/**
 * Retrieve a list of where collapsable buttons should go in the sidebar, and what lines they reference.
 * Buttons are not placed on lines whose matching bracket is on the same line
*/
const getCollapsableAreas = (reactLines: ReactLine[]) => {
	type Brackets = '[' | ']' | '{' | '}'
	interface ReduceCollapsableAreas {
		areas: CollapsableArea[]
		stack: {
			line: number,
			text: Brackets
		}[]
	}

	const reducedLines = reactLines.reduce<ReduceCollapsableAreas>((acc, segments, index) => {
		const { areas, stack } = acc
		const matchingBrackets: Partial<Record<Brackets, Brackets>> = {
			']': '[',
			'}': '{',
		}

		// this is neat.  Narrow a type by using Array.filter
		// creates a type with the 'text' field being narrowed from string to string-union
		type NarrowedReactToken = Exclude<ReactToken, 'text'> & { text: Brackets }

		segments
			// narrow ReactToken's { text: string } into just the four characters we care about
			.filter<NarrowedReactToken>((segment): segment is NarrowedReactToken => [']', '[', '}', '{'].includes(segment.text))
			.forEach(({ text }) => {
				switch (text) {
					case '{':
					case '[':
						stack.push({ line: index, text })

						break
					case '}':
					case ']':
						// don't need to worry about this breaking on first iteration, since we guarantee valid json
						const lastOnStack = stack[stack.length - 1]

						if (lastOnStack.text !== matchingBrackets[text]) {
							return
						}

						// found a match, remove opening bracket from the stack
						stack.splice(-1)

						// don't show collapsables if both brackets are on the same line
						if (lastOnStack.line === index) {
							return
						}

						areas.push({
							expanded: true,
							lineStart: lastOnStack.line,
							lineEnd: index,
						})

						break
				}
			})

		return acc
	}, {
		areas: [],
		stack: [],
	})

	return reducedLines.areas
}

/**
 * one function to rule them all, one function to join them
 * one function to bring them all, and in the react app, **bind them**
 *
 * The main function exported from this service.  Returns formatted react (json) tokens
 * and collapsable areas.
 */
const getTokenLinesAndCollapsableAreas = (data: unknown, formatting: Formatting) => {
	console.log('generating all the token')
	const tokenLines = getFormattedTokens(getTokens(data), formatting)
	const areas = getCollapsableAreas(tokenLines)

	return {
		areas,
		tokenLines,
	}
}

export {
	// getCollapsableAreas,
	// getFormattedTokens,
	// getTokens,
	getTokenLinesAndCollapsableAreas,
	type CollapsableArea,
	type JsonTokenType,
	type ReactLine,
	type ReactToken,
}

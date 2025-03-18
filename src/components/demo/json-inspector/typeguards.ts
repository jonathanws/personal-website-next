type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[]

const isString = (maybe: unknown): maybe is string => {
	return typeof maybe === 'string'
}

const isNumber = (maybe: unknown): maybe is number => {
	return typeof maybe === 'number'
}

const isBoolean = (maybe: unknown): maybe is boolean => {
	return typeof maybe === 'boolean'
}

const isNull = (maybe: unknown): maybe is null => {
	return maybe === null
}

const isJsonArray = (maybe: unknown): maybe is Json[] => {
	return Array.isArray(maybe)
		&& maybe.every((chunk) => isJson(chunk))
}

const isJson = (maybe: unknown): maybe is Json =>
	isString(maybe)
	|| isNumber(maybe)
	|| isBoolean(maybe)
	|| isNull(maybe)
	|| isJsonChunk(maybe)
	|| isJsonArray(maybe)

const isJsonChunk = (maybe: unknown): maybe is { [key: string]: Json } => {
	if (typeof maybe !== 'object') {
		return false
	}

	if (maybe === null) {
		return false
	}

	if (Array.isArray(maybe)) {
		return false
	}

	if (!Object.keys(maybe).every((k) => typeof k === 'string')) {
		return false
	}

	if (!Object.values(maybe).every((v) => isJson(v))) {
		return false
	}

	return true
}

export {
	type Json,
	isString,
	isNumber,
	isBoolean,
	isNull,
	isJsonChunk,
}
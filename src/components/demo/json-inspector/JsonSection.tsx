import { useJsonContext } from './JsonContext'
import ReactLineContainer from './ReactLineContainer'

export default function JsonSection() {
	const [areas] = useJsonContext((store) => store.areas)
	const [tokenLines] = useJsonContext((store) => store.tokenLines)

	const focus = (lineIndex: number) => {
		const area = areas.find((area) => area.lineStart === lineIndex)

		// counterintuitively, focus the row when the area is *not* expanded
		return area ? !area?.expanded : false
	}

	return tokenLines.map((line, lineIndex) => <ReactLineContainer
		key={lineIndex}
		focus={focus(lineIndex)}
		line={line}
	/>)
}
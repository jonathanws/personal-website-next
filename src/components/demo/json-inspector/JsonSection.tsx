import { CollapsableArea, ReactLine } from './json'
import ReactLineContainer from './ReactLineContainer'
import { Settings } from './services/settings'

interface Props {
	collapsableAreas: CollapsableArea[]
	reactLines: ReactLine[]
	settings: Settings
	level: number
}

export default function JsonSection({ collapsableAreas, reactLines, settings }: Props) {
	return reactLines.map((line, lineIndex) => <ReactLineContainer
		key={lineIndex}
		focus={collapsableAreas.find((area) => area.lineStart === lineIndex)?.expanded || false}
		line={line}
		settings={settings}
	/>)
}
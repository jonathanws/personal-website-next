import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import IndentRhythmPicker from './IndentRhythmPicker'
import IndentWith from './IndentWith'
import RenderWhitespace from './RenderWhitespace'
import SetAllCollapsables from './SetAllCollapsables'
import ShowLineNumbers from './ShowLineNumbers'
import ShowMetaText from './ShowMetaText'
import ShowTrailingComma from './ShowTrailingComma'
import ThemePicker from './ThemePicker'
import { indentCharactersMap } from '../services/formatting'

export default function SettingsToolbarBody() {
	return (
		<Stack direction='row' gap={1} flexGrow={1}>
			<RenderWhitespace />

			<IndentWith character={indentCharactersMap.tab} />

			<IndentWith character={indentCharactersMap.space} />

			<Divider orientation='vertical' flexItem />

			<IndentRhythmPicker />

			<Divider orientation='vertical' flexItem />

			<ThemePicker />

			<ShowTrailingComma />

			<ShowLineNumbers />

			<SetAllCollapsables title='Expand'/>

			<SetAllCollapsables title='Collapse'/>

			<ShowMetaText />
		</Stack>
	)
}
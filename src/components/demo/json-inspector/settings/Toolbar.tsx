import AddRounded from '@mui/icons-material/AddRounded'
import ExpandRounded from '@mui/icons-material/ExpandRounded'
import FormatListNumberedRounded from '@mui/icons-material/FormatListNumberedRounded'
import KeyboardTabRounded from '@mui/icons-material/KeyboardTabRounded'
import RemoveRounded from '@mui/icons-material/RemoveRounded'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import SpaceBarRounded from '@mui/icons-material/SpaceBarRounded'
import UnfoldLessRounded from '@mui/icons-material/UnfoldLessRounded'
import UnfoldMoreRounded from '@mui/icons-material/UnfoldMoreRounded'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { grey } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'
import { defaultFormatRules } from '../services/formatting'
import { indentCharactersMap, Settings, themeMap } from '../services/settings'

// TODO: don't set state if state is the same

export const defaultSettings: Settings = {
	formatting: defaultFormatRules,
	renderWhitespace: true,
	showLineNumbers: true,
	showMetaText: true,
	theme: 'default',
	trailingComma: true,
}

interface Props {
	settings: Settings
	setSettings: React.Dispatch<React.SetStateAction<Settings>>
	onCollapseAllSections: () => void
	onExpandAllSections: () => void
}

export default function SettingsToolbar({ settings, setSettings, onCollapseAllSections, onExpandAllSections }: Props) {
	const isResetEnabled = () =>
		settings.formatting.generateMetaTokens !== defaultSettings.formatting.generateMetaTokens
		|| settings.formatting.indentCharacter !== defaultSettings.formatting.indentCharacter
		|| settings.formatting.indentRhythm !== defaultSettings.formatting.indentRhythm

		|| settings.renderWhitespace !== defaultSettings.renderWhitespace
		|| settings.showLineNumbers !== defaultSettings.showLineNumbers
		|| settings.showMetaText !== defaultSettings.showMetaText
		|| settings.theme !== defaultSettings.theme
		|| settings.trailingComma !== defaultSettings.trailingComma
	const onResetSettings = () => setSettings(defaultSettings)
	const onIndentRhythmChange = (num: number) => {
		setSettings((old) => ({
			...old,
			formatting: {
				...old.formatting,
				indentRhythm: Math.max(old.formatting.indentRhythm + num, 1),
			},
		}))
	}

	const CommaSvg = () => <SvgIcon viewBox="0 0 24 24">
		<path d="m 12,5 a 5,5 0 0 0 -5,5 5,5 0 0 0 5,5 5,5 0 0 0 1,-0.113281 c -0.05304,1.682676 -0.466694,2.613178 -1.283203,3.429687 v 0.002 A 0.40000001,0.40000001 0 0 0 11.599609,18.599609 0.40000001,0.40000001 0 0 0 12,19 0.40000001,0.40000001 0 0 0 12.08398,18.9902 0.40000001,0.40000001 0 0 0 12.13476,18.97457 C 13.174111,18.678987 17,15.407581 17,10 A 5,5 0 0 0 12,5 Z" />
	</SvgIcon>

	const SquareIconButton = ({ children, onClick, selected }: { children: React.ReactNode, onClick: IconButtonProps['onClick'], selected?: boolean }) => <IconButton
		onClick={onClick}
		sx={{
			borderRadius: '15%',
			...(selected && { background: grey[700] }),
		}}
		size='medium'
	>
		{children}
	</IconButton>

	const TooltipWrapper = ({ title, children }: { children : React.ReactNode, title: string }) => <Tooltip title={title}>
		{/* div used for workaround regarding failed refs for using custom components in tooltips */}
		{/* https://stackoverflow.com/a/63521049 */}
		<div>
			{children}
		</div>
	</Tooltip>

	const RenderWhitespace = () => <SquareIconButton
		selected={settings.renderWhitespace}
		onClick={() => setSettings((old) => ({
			...old,
			renderWhitespace: !old.renderWhitespace,
		}))}
	>
		<ExpandRounded sx={{ transform: 'rotate(90deg)' }} />
	</SquareIconButton>

	const IndentWithTabs = () => <SquareIconButton
		// selected={settings.indentation.char === 'tab'}
		selected={settings.formatting.indentCharacter == indentCharactersMap.tab}
		onClick={() => {
			setSettings((old) => ({
				...old,
				formatting: {
					...old.formatting,
					indentCharacter: indentCharactersMap.tab,
				},
			}))
		}}
	>
		<KeyboardTabRounded />
	</SquareIconButton>

	const IndentWithSpace = () => <SquareIconButton
		selected={settings.formatting.indentCharacter === indentCharactersMap.space}
		onClick={() => {
			setSettings((old) => ({
				...old,
				formatting: {
					...old.formatting,
					indentCharacter: indentCharactersMap.space,
				},
			}))
		}}
	>
		<SpaceBarRounded />
	</SquareIconButton>

	const IndentRhythmPicker = () => <>
		<TooltipWrapper title='Decrease indent size'>
			<SquareIconButton onClick={() => onIndentRhythmChange(-1)}>
				<RemoveRounded />
			</SquareIconButton>
		</TooltipWrapper>

		<Box
			display='flex'
			alignItems='center'
			justifyContent='center'
			minWidth={40}
			border='1px solid'
			borderColor='divider'
			borderRadius='15%'
			fontWeight={500}
			bgcolor='transparent'
		>
			{settings.formatting.indentRhythm}
		</Box>

		<TooltipWrapper title='Increase indent size'>
			<SquareIconButton onClick={() => onIndentRhythmChange(1)}>
				<AddRounded />
			</SquareIconButton>
		</TooltipWrapper>
	</>

	const TrailingComma = () => <SquareIconButton
		selected={settings.trailingComma}
		onClick={() => setSettings((old) => ({
			...old,
			trailingComma: !old.trailingComma,
		}))}
	>
		<CommaSvg />
	</SquareIconButton>

	const CollapseAll = () => <SquareIconButton onClick={onCollapseAllSections}>
		<UnfoldLessRounded />
	</SquareIconButton>

	const ExpandAll = () => <SquareIconButton onClick={onExpandAllSections}>
		<UnfoldMoreRounded />
	</SquareIconButton>

	const ShowLineNumbers = () => <SquareIconButton
		selected={settings.showLineNumbers}
		onClick={() => setSettings((old) => ({
			...old,
			showLineNumbers: !old.showLineNumbers,
		}))}
	>
		<FormatListNumberedRounded />
	</SquareIconButton>

	const ThemePicker = () => <Select
		value={settings.theme}
		size='small'
		onChange={(event) => setSettings((old) => ({
			...old,
			theme: event.target.value as typeof settings.theme,
		}))}
	>
		{Object.keys(themeMap).map((k) => <MenuItem key={k} value={k}>{k}</MenuItem>)}
	</Select>

	return (
		<AppBar
			position='static'
			sx={{
				borderTopLeftRadius: 3,
				borderTopRightRadius: 3,
			}}
			elevation={3}
		>
			<Toolbar
				sx={{
					flexDirection: 'column',
					gap: 1,
					py: 1,
				}}>
				{/* major actions like reset, paste, save */}
				<Stack
					width='100%'
					flexDirection='row'
				>
					<Button
						variant="contained"
						startIcon={<SettingsBackupRestoreIcon />}
						disabled={!isResetEnabled}
						onClick={onResetSettings}
					>
						reset
					</Button>
				</Stack>

				{/* minor actions */}
				<Stack
					gap={1}
					p={1}
					flexGrow={1}
					borderRadius={1}
					width='100%'
					sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
				>
					<Stack direction='row' gap={1} flexGrow={1}>
						<TooltipWrapper title='Render whitespace'>
							<RenderWhitespace />
						</TooltipWrapper>

						<TooltipWrapper title='Indent with tabs'>
							<IndentWithTabs />
						</TooltipWrapper>

						<TooltipWrapper title='Indent with spaces'>
							<IndentWithSpace />
						</TooltipWrapper>

						<Divider orientation='vertical' flexItem />

						<IndentRhythmPicker />

						<Divider orientation='vertical' flexItem />

						<ThemePicker />

						<TooltipWrapper title='Trailing comma'>
							<TrailingComma />
						</TooltipWrapper>

						<TooltipWrapper title='Show line numbers'>
							<ShowLineNumbers />
						</TooltipWrapper>

						<TooltipWrapper title='Expand all sections'>
							<ExpandAll />
						</TooltipWrapper>

						<TooltipWrapper title='Collapse all sections'>
							<CollapseAll />
						</TooltipWrapper>
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}
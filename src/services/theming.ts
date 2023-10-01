const BG_PRIMARY = '#111418'
const BG_ALT = '#0f1924'

const REM = 'rem'
const paddings = {
	/* eslint-disable sort-keys */
	xl: `6${REM}`, // 1536
	lg: `4${REM}`, // 1200
	md: `5${REM}`, // 900
	sm: `3${REM}`, // 600
	/* eslint-enable sort-keys */
}

const Y_PADDINGS = 3
const headerPaddings = {
	paddingLeft: paddings,
	paddingRight: paddings,
}
const sectionPaddings = {
	...headerPaddings,
	paddingBottom: Y_PADDINGS,
	paddingTop: Y_PADDINGS,
}

export {
	BG_ALT,
	BG_PRIMARY,
	paddings,
	headerPaddings,
	sectionPaddings,
}
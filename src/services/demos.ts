import jerseyIdDemo from '@/components/demo/jersey-id'

const demoUrlPrefix = '/demo/'
type DemoPageUrl = `${typeof demoUrlPrefix}${
	| 'whos-wearing-that-number'
}`

interface Demo {
	alt: string
	body: () => React.ReactNode
	description: string
	heroSrc: string
	icon: React.ReactNode
	title: string
	url: DemoPageUrl // the unique identifier of a demo
}

const getDemos = (): Demo[] => [
	jerseyIdDemo,
]

export {
	type Demo,
	type DemoPageUrl,
	demoUrlPrefix,
	getDemos,
}
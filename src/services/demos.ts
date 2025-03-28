import jerseyIdDemo from '@/components/demo/jersey-id'

const demoUrlPrefix = '/demo/'
type DemoPageUrl = `${typeof demoUrlPrefix}${
	| 'jersey-id'
}`

interface Demo {
	alt: string
	body: () => React.ReactNode
	description: string
	heroSrc: string
	icon: React.ReactNode
	src: string
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
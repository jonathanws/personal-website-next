import Link from '@mui/material/Link'

interface Props {
	href: string
	text: string
}

export default function BlogLink({ href, text }: Props) {
	return (
		<Link href={href}>
			{text}
		</Link>
	)
}
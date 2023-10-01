interface Props {
	href: string
	text: string
}

export default function BlogLink({ href, text }: Props) {
	return (
		<a
			href={href}
			rel="noreferrer"
			target="_blank"
		>
			{text}
		</a>
	)
}
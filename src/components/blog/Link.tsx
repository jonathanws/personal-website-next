import { Link as MUILink } from '@mui/material'
import NextLink from 'next/link'

interface Props {
	href: string
	text: string
}

export default function BlogLink({ href, text }: Props) {
	return (
		<NextLink
			href={href}
			passHref
			target='_blank'
		>
			<MUILink>
				{text}
			</MUILink>
		</NextLink>
	)
}
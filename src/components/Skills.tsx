import { default as PeopleIcon } from '@mui/icons-material/People'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { sectionPaddings } from '@/services/theming'

const LOGO_SIZE = 28
const logoDimensions = {
	height: LOGO_SIZE,
	width: LOGO_SIZE,
}

interface Skill {
	duration: string
	icons: JSX.Element[]
	title: string
}

const getTooltips = (icons: { alt: string, src: string }[]) =>
	icons.map(({ alt, src }, index) =>
		<Tooltip key={index} title={alt}>
			<img src={src} alt={alt} {...logoDimensions} />
		</Tooltip>,
	)

const skills: Skill[] = [
	{
		duration: '6 years',
		icons: getTooltips([
			{
				alt:'Angular.js',
				src: '/angular.svg',
			},
			{
				alt:'Vue',
				src: '/vue.svg',
			},
			{
				alt:'React',
				src: '/react.svg',
			},
		]),
		title: 'Web Frameworks',
	},
	{
		duration: '2.5 years / 5 years',
		icons: getTooltips([
			{
				alt: 'Typescript',
				src: '/typescript.svg',
			},
			{
				alt: 'Javascript',
				src: '/javascript.svg',
			},
		]),
		title: 'Typescript, Node',
	},
	{
		duration: '2 years',
		icons: getTooltips([
			{
				alt:'Amazon Web Services',
				src: '/aws.svg',
			},
			{
				alt:'Google Cloud Platform',
				src: '/gcp.svg',
			},
		]),
		title: 'Cloud Services',
	},
	{
		duration: '6 months',
		icons: [<PeopleIcon key={0} color='action' sx={logoDimensions} />],
		title: 'Managing Devs',
	},
	{
		duration: '9 years',
		icons: getTooltips([
			{
				alt: 'Postgres',
				src: '/postgres.svg',
			},
			{
				alt: 'MongoDB',
				src: '/mongo.svg',
			},
		]),
		title: 'Databases',
	},
]

interface Props {
	backgroundColor: string
}

export default function Skills({ backgroundColor }: Props) {
	return (
		<Box sx={{ backgroundColor }}>
			<Container sx={sectionPaddings}>
				<Typography variant='h3'>Skills</Typography>

				<Grid container spacing={{ md: 3, xs: 2 }} columns={{ md: 12, sm: 8, xs: 4 }}>
					{skills.map(({ duration, icons, title }, index) => (
						<Grid item xs={2} sm={4} md={4} key={index}>
							<Stack direction='row' spacing={1}>{icons}</Stack>
							<Typography variant='h6'>{title}</Typography>
							<Typography variant='body2' sx={{ color: '#b0b8c4', mb: 4 }}>{duration}</Typography>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	)
}

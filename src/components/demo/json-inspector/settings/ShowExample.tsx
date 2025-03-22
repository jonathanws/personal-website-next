import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { getTokenLinesAndCollapsableAreas } from '../json'
import { useJsonContext } from '../JsonContext'
import { Json } from '../typeguards'

const examples: Json[] = [
	{
		'fileName': 'job-application-resume.pdf',
		'name': 'Whiskers McFluffington',
		'age': 5,
		'species': 'Felis catus',
		'careerObjective': 'Seeking full-time position in a sunbeam where I can maximize my napping efficiency and receive regular attention.',
		'skills': {
			'ignoringCommands': 'Flawless Execution',
			'keyboardWalking': 'Certified Professional',
			'lapWarming': 'Seasonal Availability',
			'napping': 'Expert',
			'staringJudgmentally': 'Master',
			'zoomies': 'Occasional but intense',
		},
		'workExperience': [
			{
				'company': 'The Human Household',
				'position': 'Senior Nap Strategist',
				'yearsWorked': 5,
				'achievements': [
					'Optimized napping locations based on warmth and softness',
					'Successfully intercepted 147 Zoom meetings',
					'Led 3 AM sprint drills down the hallway',
				],
			},
			{
				'company': 'Neighborhood Watch',
				'position': 'Window Surveillance Officer',
				'yearsWorked': 3,
				'achievements': [
					'Kept an eye on 37 suspicious birds',
					'Defended household from the vacuum cleaner invasion',
					'Sounded alarm (yowling at 2 AM) for unknown reasons',
				],
			},
		],
		'education': {
			'institution': 'The School of Hard Naps',
			'degree': 'Master of Sleep Sciences',
			'yearGraduated': 2019,
		},
		'references': [
			{
				'name': 'Mr. Squeaky Mouse (Stuffed)',
				'relationship': 'Colleague',
				'contact': 'Currently MIA under the couch',
			},
			{
				'name': 'The Dog',
				'relationship': 'Frenemy',
				'endorsement': 'Barks incoherently, unsure if positive or negative',
			},
		],
		'availability': 'Subject to whims and the presence of treats',
	},
]

export default function ShowExample() {
	const [formatting, setStore] = useJsonContext(({ formatting }) => formatting)
	// we iterate through the examples, keep track of which one we've already shown
	const [exampleIndex, setExampleIndex] = useState(0)

	return (
		<Button
			variant='contained'
			startIcon={<AutoAwesomeRoundedIcon />}
			onClick={() => {
				setStore({ ...(getTokenLinesAndCollapsableAreas(examples[exampleIndex], formatting)) })
				// if at end of array, start at the beginning
				setExampleIndex(exampleIndex + 1 >= examples.length ? 0 : exampleIndex + 1)
			}}
		>
			show example
		</Button>
	)
}
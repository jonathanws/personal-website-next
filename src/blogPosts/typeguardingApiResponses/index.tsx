import Typography from '@mui/material/Typography'
import Code from '@/components/blog/Code'
import BlogInlineCode from '@/components/blog/InlineCode'
import BlogLink from '@/components/blog/Link'
import { BlogPost } from '@/services/blogPosts'

const IMG_DIR = '/blog/typeguardingApiResponses'

const typeguardingApiResponses: BlogPost = {
	author: 'jonSmoley',
	body: <>
		<Typography paragraph>Whether it&apos;s a database query, API call, or reading from a local file, every Node.js developer has had to pull data into their code at one point. Good developers might validate and verify what they&apos;ve read, but if you&apos;re using Typescript it can be tricky to assign types to data that could essentially be anything!</Typography>
		<Typography paragraph>Let&apos;s say we&apos;re reading data returned from a call to the <BlogLink href='https://dog.ceo/dog-api/' text='Dog API'></BlogLink>.</Typography>
		<Code
			language='typescript'
			text={[
				'const DOG_API = \'https://dog.ceo/api\'',
				'',
				'const getRandomDog = async () => {',
				'	const url = `${DOG_API}/breeds/image/random`',
				'	const dogApiResponse = await fetch(url)',
				'	const json = await dogApiResponse.json()',
				'',
				'	return json',
				'}',
			]}
		/>
		<Typography paragraph>And if everything is plugged in and we successfully parse the returned data, we&apos;d expect to see a <BlogInlineCode>DogInterface</BlogInlineCode> in a shape like this:</Typography>
		<Code
			language='typescript'
			text={[
				'// see: https://dog.ceo/dog-api/documentation/random',
				'interface DogInterface {',
				'	message: string',
				'	status: string',
				'}',
			]}
		/>
		<Typography paragraph>Unsurprisingly, there&apos;s no way for Typescript to immediately know the shape that comes back from this route.  Furthermore, if the owner of the Dog API decides to tweak a property or change the shape of the data, how would Typescript ever know?  The <BlogInlineCode>fetch</BlogInlineCode> function offers no way (through generics or other means) to gain typing, so we have to figure out how to add it after the call is made if we want types.</Typography>
		<Typography paragraph>Typescript supports casting of types (<BlogLink href='https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions' text='called type assertions' />) that allow us to force type behavior if typescript support is lacking.  With the right syntax (using <BlogInlineCode>as</BlogInlineCode>) you can force almost any types, for better or for worse.</Typography>
		<Code
			language='typescript'
			text={[
				'const getUserRecord = () => {',
				'	const record = db.table.select()',
				'',
				'	// return a UserRecord, even if we don\'t get one',
				'	return (record as UserRecord)',
				'}',
				'',
				'const getNumber = () => {',
				'	const str = \'Im totally a string\'',
				'',
				'	// return a variable with inaccurate type',
				'	return str as unknown as number',
				'}',
			]}
		/>
		<Typography paragraph>If we knew beforehand exactly what shape the Dog API would return, we could absolute use the <BlogInlineCode>as</BlogInlineCode> keyword to just declare that the returned data is of type <BlogInlineCode>DogInterface</BlogInlineCode>.</Typography>
		<Code
			language='typescript'
			text={[
				'const validateDog = async () => {',
				'	const response = await getRandomDog()',
				'',
				'	const randomDog = response as DogInterface',
				'',
				'	// randomDog.message ✅',
				'	// randomDog.status  ✅',
				'',
				'	return randomDog',
				'}',
			]}
		/>
		  {/* That however comes with it&apos;s own risks, since but it would work.  Using our dog API above, that approach might look something like this: */}
		<Typography paragraph>Now imagine sometime later, several months after your code has been deployed to production, the author of the Dog API changed the shape of the API response and since we just <i>declared</i> that the above response is of type <BlogInlineCode>DogInterface</BlogInlineCode>, we never catch the new bug.  The returned data is different, and we see the ever famous <BlogInlineCode>Cannot read properties of undefined</BlogInlineCode> error.  Our boss makes us deploy a patch on a Saturday while you&apos;re on vacation in Maui.  If only we validated our data!</Typography>
		<Typography paragraph>&quot;But wait!&quot; you say, &quot;What if I added <BlogInlineCode>if</BlogInlineCode> checks to see if the properties exist?&quot;</Typography>
		<Code
			language='typescript'
			text={[
				'const validateDog = async () => {',
				'	const response = await getRandomDog()',
				'',
				'	if (',
				'		response',
				'		&& typeof response.message === \'string\'',
				'		&& typeof response.status === \'string\'',
				'	) {',
				'		return (response as DogInterface)',
				'	} else {',
				'		// handle error case',
				'	}',
				'}',
			]}
		/>
		<Typography paragraph>Our weekends are saved!  Our function now does validation, and we have a way to handle unexpected changes in our API contracts.  We&apos;ve solved our issues, but our code is looking a little unweildy.  Wouldn&apos;t it be great if Typescript had syntax for these types of functions?</Typography>

		<Typography variant='h3'>Type Guards</Typography>
		<Typography paragraph>A type guard is a typescript function that can assign a type to a variable, but only if conditions are met, similar to what we just saw above.  They always return a boolean, and use a new keyword, <BlogInlineCode>is</BlogInlineCode>, as part of the return signature.</Typography>
		<Code
			language='typescript'
			text={[
				'const isDog = (maybeDog: any): maybeDog is DogInterface => {',
				'	return maybeDog && (',
				'		typeof maybeDog.message === \'string\' &&',
				'		typeof maybeDog.status === \'string\'',
				'	)',
				'}',
			]}
		/>
		<Typography paragraph>Using a type guard is the combination of type inference (like when using <BlogInlineCode>as DogInterface</BlogInlineCode>), and runtime checks. We get correct typing in our IDE, and any deployed Javascript has extra checks.</Typography>
		<Typography paragraph>Putting everything together we would use the typeguard like a simple function that returns a boolean.</Typography>
		<Code
			language='typescript'
			text={[
				'const validateDog = async (): Promise<DogInterface> => {',
				'	const response = await getRandomDog()',
				'',
				'	if (isDog(response)) {',
				'		// in this `if` block, `response` resolves to',
				'		// be a `DogInterface`',
				'		return response',
				'	} else {',
				'		// in this `else` block, `response` resolves to',
				'		// be `any`',
				'		throw new Error()',
				'	}',
				'}',
				'',
				'const isDog = (maybeDog: any): maybeDog is DogInterface => {',
				'	return maybeDog && (',
				'		typeof maybeDog.message === \'string\' &&',
				'		typeof maybeDog.status === \'string\'',
				'	)',
				'}',
			]}
		/>
		<Typography paragraph>Now we have runtime checks, correct types, and all of that using our fancy new Typescript syntax.</Typography>

		<Typography variant='h3'>Helpful type guards</Typography>

		<Typography variant='h4'>Primitives (Numbers, Strings, etc)</Typography>
		<Code
			language='typescript'
			text={[
				'const isNumber = (n: any): n is number => {',
				'	return typeof n === \'number\'',
				'}',
				'',
				'const isBoolean = (b: any): b is boolean => {',
				'	return typeof b === \'boolean\'',
				'}',
				'',
				'const isString = (s: any): s is string => {',
				'	return typeof s === \'string\'',
				'}',
			]}
		/>

		<Typography variant='h4'>String unions</Typography>
		<Typography paragraph>Interfaces and types can&apos;t be used inside of <BlogInlineCode>if</BlogInlineCode>/<BlogInlineCode>else</BlogInlineCode> statements, so we can&apos;t directly check against them.  To create a type guard, we can change the way we declare our string union types by instead defining them from a string array, and use that array in the type guard.</Typography>
		<Code
			language='typescript'
			text={[
				'// OLD - string union literal',
				'type Status = \'success\' | \'failed\' | \'pending\'',
			]}
		/>
		<Code
			language='typescript'
			text={[
				'// NEW - string union derived from array',
				'const STATUSES = [\'success\', \'failed\', \'pending\'] as const',
				'type Status = typeof STATUSES[number]',
				'',
				'const isStatus = (maybeStatus: any): maybeStatus is Status => {',
				'	return STATUSES.includes(maybeStatus)',
				'}',
			]}
		/>

		<Typography variant='h4'>Classes</Typography>
		<Typography paragraph>For classes we can use the <BlogInlineCode>instanceof</BlogInlineCode> operator.</Typography>
		<Code
			language='typescript'
			text={[
				'class HttpRequest {',
				'	status: string',
				'}',
				'',
				'const isHttpRequest = (h: any): h is HttpRequest => {',
				'	return (h instanceof HttpRequest)',
				'}',
			]}
		/>
	</>,
	bodyTitle: 'Using Typescript typeguards to validate API responses',
	date: 'TODO',
	description: 'How to use typescript\'s typeguard features to property validate incoming data like SQL, HTTP responses, and files',
	heroSrc:`${IMG_DIR}/hero.png`,
	icon: <img src='/typescript.svg' alt='Typescript' height={24} width={24} />,
	menuTitle: 'Validating API Responses',
	tags: ['typescript'],
	url: 'validating-api-responses',
}

export default typeguardingApiResponses
import Typography from '@mui/material/Typography'
import Code from '@/components/blog/Code'
import BlogInlineCode from '@/components/blog/InlineCode'
import BlogLink from '@/components/blog/Link'
import { BlogPost } from '@/services/blogPosts'

const IMG_DIR = '/blog/typeguardingApiResponses'

const typeguardingApiResponses: BlogPost = {
	author: 'jonSmoley',
	body: <>
		<Typography paragraph>Whether it&apos;s a database query, API call, or reading from a local file, every Node.js developer has had to pull data into their code. Good developers might take the extra steps to validate and verify what they&apos;re reading, but if you&apos;re using Typescript it can be tricky to accurately assign types to incoming data that could essentially be anything!</Typography>
		<Typography paragraph>Let&apos;s say we&apos;re making an API call, and reading data returned from a the <BlogLink href='https://dog.ceo/dog-api/' text='Dog API'></BlogLink>.</Typography>
		<Code
			language='typescript'
			text={[
				'// This is a real api!',
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
		<Typography paragraph>If everything is plugged in and we successfully parse the returned data, we&apos;d expect the returned data to be a <BlogInlineCode>RandomDog</BlogInlineCode> in a shape like this:</Typography>
		<Code
			language='typescript'
			text={[
				'interface RandomDog {',
				'	message: string',
				'	status: string',
				'}',
			]}
		/>
		<Typography paragraph>Unsurprisingly, the <BlogInlineCode>fetch</BlogInlineCode> function has no clue what the shape of the jsonified returned data is. (when we call <BlogInlineCode>.json()</BlogInlineCode> on the response, it&apos;s type is <BlogInlineCode>any</BlogInlineCode>)  But this isn&apos;t a bug; <BlogInlineCode>fetch</BlogInlineCode> is supposed to be used for many API calls, and it&apos;s up to the developer to determine the type.  Also, imagine if the owner of the Dog API decides to later tweak a property or change the shape of the data, how would Typescript ever know?  We need to create our own strategy to figure out how to add types after the call is made.</Typography>
		<Typography paragraph>Typescript supports casting types (<BlogLink href='https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions' text='called type assertions' />) that allow us to force type behavior if typescript support is lacking.  With the right syntax (using <BlogInlineCode>as</BlogInlineCode>) you can force almost any type, for better or for worse.</Typography>
		<Code
			language='typescript'
			text={[
				'const validateDog = async () => {',
				'	const response = await getRandomDog()',
				'',
				'	const randomDog = response as RandomDog',
				'',
				'	// randomDog.message (string) ✅',
				'	// randomDog.status  (string) ✅',
				'',
				'	return randomDog',
				'}',
			]}
		/>
		<Typography paragraph>Since we know that our route <i>should</i> return a <BlogInlineCode>RandomDog</BlogInlineCode>, we could cast the response from the API call to be of that type, and we get correct typing and syntax highlighting in our IDE.  Nice!</Typography>
		<Typography paragraph>However, <BlogInlineCode>as</BlogInlineCode> really trusts you to make the right decision, and if you aren&apos;t careful, you can end up doing more harm than good.  All the code below is valid Typescript.</Typography>
		<Code
			language='typescript'
			text={[
				'const getUserRecord = () => {',
				'	const record = db.table.select(1)',
				'',
				'	// return a UserRecord even if we don\'t get one',
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
		<Typography paragraph>So, our function uses a type assertion to give us correct types, but imagine sometime later, several months after our code has been deployed to production, the author of the Dog API changes the shape of the API response.  Since we <i>declared</i> that the above response will always be of type <BlogInlineCode>RandomDog</BlogInlineCode>, we never catch the changed data.  <b>We have a bug.</b>  The returned data is different, and we see the ever famous <BlogInlineCode>Cannot read properties of undefined</BlogInlineCode> error.  Our boss makes us deploy a patch on a Saturday while we&apos;re on vacation in Maui.  If only we validated our data!</Typography>
		<Typography paragraph>&quot;But wait!&quot; you say, &quot;What if I just add <BlogInlineCode>if</BlogInlineCode> checks to see if the properties exist?&quot;</Typography>
		<Code
			language='typescript'
			highlightLines={[5, 6, 7]}
			text={[
				'const validateDog = async () => {',
				'	const response = await getRandomDog()',
				'',
				'	if (',
				'		response',
				'		&& typeof response.message === \'string\'',
				'		&& typeof response.status === \'string\'',
				'	) {',
				'		return (response as RandomDog)',
				'	} else {',
				'		// handle error case',
				'	}',
				'}',
			]}
		/>
		<Typography paragraph>Our vacations are saved!  Our function now does validation, we have correct typing, and we have a way to handle unexpected changes in our API contracts.  We&apos;ve solved our issues, but our code is looking a little unweildy.  Wouldn&apos;t it be great if Typescript had syntax for this type of logic?</Typography>

		<Typography variant='h3'>Type Guard Functions</Typography>
		<Typography paragraph>A <BlogLink href='https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards' text='type guard function'></BlogLink> is a function that can assign a type to a variable, but only if conditions are met, similar to what we just saw above.  They always return a boolean, and use a new keyword, <BlogInlineCode>is</BlogInlineCode>, as part of the return signature.</Typography>
		<Code
			language='typescript'
			text={[
				'const isDog = (maybeDog: any): maybeDog is RandomDog => {',
				'	return maybeDog && (',
				'		typeof maybeDog.message === \'string\' &&',
				'		typeof maybeDog.status === \'string\'',
				'	)',
				'}',
			]}
		/>
		<Typography paragraph>Using a type guard is the combination of type inference (like when using <BlogInlineCode>as RandomDog</BlogInlineCode>), and runtime checks. We get correct typing in our IDE, and any deployed Javascript has extra checks.  Putting everything together we would use the type guard like a simple function that returns a boolean.</Typography>
		<Code
			language='typescript'
			highlightLines={[4]}
			text={[
				'const validateDog = async (): Promise<RandomDog> => {',
				'	const response = await getRandomDog()',
				'',
				'	if (isDog(response)) {',
				'		// in this `if` block, `response` resolves to',
				'		// be a `RandomDog`',
				'		return response',
				'	} else {',
				'		// in this `else` block, `response` resolves to',
				'		// be `any`',
				'		throw new Error()',
				'	}',
				'}',
				'',
				'const isDog = (maybeDog: any): maybeDog is RandomDog => {',
				'	return maybeDog && (',
				'		typeof maybeDog.message === \'string\' &&',
				'		typeof maybeDog.status === \'string\'',
				'	)',
				'}',
			]}
		/>
		<Typography paragraph>Now our <BlogInlineCode>validateDog()</BlogInlineCode> function looks much more maintainable, has runtime checks, correct types, and all of it using our fancy new Typescript syntax.</Typography>

		<Typography variant='h3'>Helpful type guards</Typography>
		<Typography paragraph>Now that you&apos;re ready to mix and match type guard functions on your own, take a look at some commonly-used type guards.</Typography>
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
		<Typography paragraph>String union types can&apos;t be used inside of <BlogInlineCode>if</BlogInlineCode>/<BlogInlineCode>else</BlogInlineCode> statements, so we can&apos;t directly check against them.  To create a type guard, we can change the way we declare our string union types by instead defining them from a string array, and using <i>that</i> array in the type guard.</Typography>
		<Code
			language='typescript'
			text={[
				'// OLD - string union literal',
				'type Status = \'success\' | \'failed\' | \'pending\'',
				'',
				'// NEW - string union derived from string array',
				'const STATUSES = [\'success\', \'failed\', \'pending\'] as const',
				'type Status = typeof STATUSES[number]',
			]}
		/>
		<Typography paragraph>Then we use the string array in our type guard.</Typography>
		<Code
			language='typescript'
			text={[
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
	bodyTitle: 'Using Typescript type guards to validate API responses',
	date: 'Monday Oct 9, 2023',
	description: 'How to use typescript\'s type guard features to property validate incoming data like SQL, HTTP responses, and files',
	heroSrc:`${IMG_DIR}/hero.png`,
	icon: <img src='/typescript.svg' alt='Typescript' height={24} width={24} />,
	menuTitle: 'Validating API Responses',
	tags: ['typescript'],
	url: 'validating-api-responses',
}

export default typeguardingApiResponses
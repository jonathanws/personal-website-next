import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Code from '@/components/blog/Code'
import BlogImage from '@/components/blog/Image'
import BlogInlineCode from '@/components/blog/InlineCode'
import BlogLink from '@/components/blog/Link'
import { BlogPost } from '@/services/blogPosts'
import { getHostname } from '@/services/constants'

const IMG_DIR = '/blog/prettyLinkPreviews'

// variables declared here since they are referenced in both the text and actual blog object
const bodyTitle = 'Create pretty link previews with meta tags'
const description = 'Use OpenGraph Meta tags to create professional looking links'
const heroSrc = `${IMG_DIR}/hero.png`
const url = '/blog/pretty-link-previews'

/** Displays screenshots in a padded container, just so they look nicer */
const screenshotContainer = (screenshot: React.ReactNode) => <Box sx={{ padding: '0 20%' }}>{screenshot}</Box>

const prettyLinkPreviews: BlogPost = {
	author: 'jonSmoley',
	body: <>
		<Typography paragraph>Nobody likes a boring hyperlink, especially one that&apos;s long and filled with alphanumeric gibberish.  Link previews on the other hand tell readers what content is in your link, and increase engagement.  But how do we tell apps and websites to create previews of our gorgeous websites?</Typography>
		<Typography paragraph>The <BlogLink text='Open Graph Protocol' href='https://ogp.me/' /> lets you define metadata about your website that apps and other websites can read from to create visual link previews.  The available fields evolve over time, but most websites use them for images, titles, and descriptions.</Typography>

		<Typography variant='h3'>The short and sweet</Typography>

		<Typography paragraph>For most use cases, apps and websites only need these fields to create previews.  Add these fields to your <BlogInlineCode>&lt;head&gt;</BlogInlineCode> tag.</Typography>
		<Code
			language='htmlbars'
			text={[
				'<head>',
				'	<!-- Show a thumbnail image next to your link -->',
				'	<meta property="og:image" content="">',
				'',
				'	<!-- The link of your link!  Who knew -->',
				'	<meta property="og:url" content="">',
				'',
				'	<!-- The main title of your link -->',
				'	<meta property="og:title" content="">',
				'',
				'	<!-- Content description, used by accessibility tools -->',
				'	<meta property="og:description" content="">',
				'',
				'	<!-- The type of content.  video, music, article, etc -->',
				'	<meta property="og:type" content="">',
				'',
				'	<!-- The language of your content -->',
				'	<meta property="og:locale" content="">',
				'</head>',
			]}
		/>
		<Typography paragraph>And that&apos;s it!  Once you deploy your changes you&apos;ll start seeing link previews like these:</Typography>

		<Typography variant='h4'>Android</Typography>

		{screenshotContainer(<BlogImage src={`${IMG_DIR}/android-messenger-screenshot.png`} alt='Android messenger link preview' />)}

		<Typography variant='h4'>iMessage</Typography>

		<Typography paragraph>Note: iMessage currently does not read <BlogInlineCode>og:description</BlogInlineCode></Typography>
		{screenshotContainer(<BlogImage src={`${IMG_DIR}/imessage-screenshot.png`} alt='iMessage link preview' />)}

		<Typography variant='h4'>Discord</Typography>
		{screenshotContainer(<BlogImage src={`${IMG_DIR}/discord-screenshot.png`} alt='Discord link preview' />)}

		<Typography variant='h4'>Signal</Typography>

		<Typography paragraph>Note: Signal will not use images for previews if the url for that image does not begin with <BlogInlineCode>https</BlogInlineCode>.  The first message here uses <BlogInlineCode>http</BlogInlineCode>, and the second uses <BlogInlineCode>https</BlogInlineCode>.</Typography>
		{screenshotContainer(<BlogImage src={`${IMG_DIR}/signal-screenshot.png`} alt='Signal link preview' />)}

		<Typography variant='h4'>LinkedIn</Typography>

		<Typography paragraph>Note: LinkedIn will not show a description if an image is found.  If you&apos;re curious how linkedin will display your link, you can use their <BlogLink text='post inspector tool' href='https://www.linkedin.com/post-inspector/' />.</Typography>
		{screenshotContainer(<BlogImage src={`${IMG_DIR}/linkedin-screenshot.png`} alt='LinkedIn link preview' />)}

		<Typography variant='h3'>Commonly used Open Graph tags</Typography>

		<Typography variant='h4'>og:description</Typography>

		<Typography paragraph>Description of your content.  Used by accessibility tools</Typography>
		<Code
			language='htmlbars'
			text={[
				'<meta',
				'	property="og:description"',
				`	content="${description}"`,
				'>',
			]}
		/>

		<Typography variant='h4'>og:image</Typography>

		<Typography paragraph>Shows a thumbnail image to display next to your content.  While you can have multiple <BlogInlineCode>og:image</BlogInlineCode> meta tags, it is recommended to only use one.  Some websites will add pagination arrows on your thumbnail to see the different images, but most websites do not support this.</Typography>
		<Code
			language='htmlbars'
			text={[
				'<meta',
				'	property="og:image"',
				`	content="${getHostname()}${IMG_DIR}/${heroSrc}"`,
				'>',
			]}
		/>

		<Typography variant='h4'>og:locale</Typography>

		<Typography paragraph>Most websites (<BlogLink text='like Facebook' href='https://developers.facebook.com/docs/javascript/internationalization#locales' />) support declaring a locale (like <BlogInlineCode>en_US</BlogInlineCode>) where the first two letters are a language code, and last two are a country code.</Typography>
		<Code
			language='htmlbars'
			text={[
				'<meta',
				'	property="og:locale"',
				'	content="en_US"',
				'>',
			]}
		/>

		<Typography variant='h4'>og:title</Typography>

		<Typography paragraph>Very similar to the <BlogInlineCode>&lt;title&gt;</BlogInlineCode> tag, this puts the title in the same spot as other open graph tags.  It is recommended to have both on your website.</Typography>
		<Code
			language='htmlbars'
			text={[
				'<meta',
				'	property="og:title"',
				`	content="${bodyTitle}">`,
				'>',
			]}
		/>

		<Typography variant='h4'>og:type</Typography>

		<Typography paragraph>Specifies the <BlogLink text='type of content' href='https://ogp.me/#types' /> on the page. At the time of writing this article, there are types for <BlogLink text='music' href='https://ogp.me/#type_music' />, <BlogLink text='videos' href='https://ogp.me/#type_video' />, <BlogLink text='articles' href='https://ogp.me/#type_article' />, <BlogLink text='books' href='https://ogp.me/#type_book' />, <BlogLink text='profiles' href='https://ogp.me/#type_profile' />, and <BlogLink text='websites' href='https://ogp.me/#type_website' />.  This list will grow as the community agrees on the schema for more types.</Typography>
		<Code
			language='htmlbars'
			text={[
				'<meta',
				'	property="og:type"',
				'	content="article"',
				'>',
			]}
		/>

		<Typography variant='h4'>og:url</Typography>

		<Typography paragraph>The URL where your content can be found.  While this might seem redundant, this helps other tools with not making duplicate records of your content.</Typography>
		<Code
			language='htmlbars'
			text={[
				'<meta',
				'	property="og:url"',
				`	content="${getHostname()}/${url}"`, // make sure this matches prod
				'>',
			]}
		/>
	</>,
	bodyTitle,
	date: 'Tuesday December 10, 2024',
	description,
	heroSrc,
	icon: <img src='/html5.svg' alt='HTML' height={24} width={24} />,
	menuTitle: 'Pretty Link Previews',
	tags: ['html', 'seo'],
	url,
}

export default prettyLinkPreviews
import Typography from '@mui/material/Typography'
import BlogAlert from '@/components/blog/Alert'
import { BlogBulletList, BlogBulletListItem } from '@/components/blog/BulletList'
import Code from '@/components/blog/Code'
import BlogImage from '@/components/blog/Image'
import BlogInlineCode from '@/components/blog/InlineCode'
import BlogLink from '@/components/blog/Link'
import { BlogPost } from '@/services/blogPosts'

const gitStyleFormat = '%C(<your-style>)<git-flag>'
const gitStyleFormatExample = '%C(red italic)%ah'

const IMG_DIR = '/blog/prettyGitHistory'

const prettyGitHistory: BlogPost = {
	author: 'jonSmoley',
	body: <>
		<Typography paragraph>Everyone knows that to be a REAL programmer, you have to use the command line.  GitLens?  GitKraken?  That won&apos;t impress your crush.  To do that, you need to use the Git CLI.  But just because you&apos;re using the command line doesn&apos;t mean that you have to put up with the superfluous text it generates.</Typography>
		<Typography paragraph>Chances are when you check your Git history, the output looks like this:</Typography>
		<BlogImage src={`${IMG_DIR}/git-ugly.png`} alt='ugly Git history' />
		<Typography paragraph>One of the most used commands, <BlogInlineCode>git log</BlogInlineCode>, is famous for printing lots of text when 90% of the time, you just want to see the past couple commits. You don&apos;t need all of that extra information like the full Git hash (short hashes work in most cases), the exact second a commit happened, or the <i>timezone offset</i>.  Sometimes, less is more.</Typography>
		<Typography paragraph>To reduce this bloat, you might try creating a separate executable that runs your Git commands, parses the output, and has a field day with <BlogInlineCode>grep</BlogInlineCode> and <BlogInlineCode>sed</BlogInlineCode>.  What if I told you Git already supports similar behavior, and requires nothing more than a config file that you already have on your computer?</Typography>

		<Typography variant='h3'>Git Aliases</Typography>
		<Typography paragraph><BlogLink href='https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases' text='Git aliases' /> work similarly to bash aliases, just with a narrower use case.  You define an alias to map to an existing Git command (or in some cases, an external command), and Git will execute it.  Aliases can be defined either via the Git CLI itself, or be hardcoded into your <BlogInlineCode>~/.gitconfig</BlogInlineCode>.  The two following examples are equivalent and will execute the same <BlogInlineCode>$ git checkout</BlogInlineCode> command when the user types <BlogInlineCode>$ git co</BlogInlineCode>.</Typography>
		<Code
			language='bash'
			text={['$ git config --global alias.co checkout']}
		/>
		<Code
			language='bash'
			text={[
				'# ~/.gitconfig',
				'',
				'[alias]',
				'	co = checkout',
			]}
		/>
		<BlogAlert severity='info'>While it is possible to configure your base <BlogInlineCode>git log</BlogInlineCode> behavior with styling below, it is recommended to instead customize an alias in case you need to reference the original output.</BlogAlert>
		<Typography paragraph>The rest of this article will focus on customizing an alias for the <BlogInlineCode>git log</BlogInlineCode> command, and show how to use the supported color and style formatting to change the output to a much more readable output, like this:</Typography>
		<BlogImage src={`${IMG_DIR}/git-pretty.png`} alt='pretty Git history' />

		<Typography variant='h3'>Styling your output</Typography>
		<Typography paragraph>While we don&apos;t get full RGB support, Git <BlogLink href='https://git-scm.com/book/sv/v2/Customizing-Git-Git-Configuration#:~:text=the%20autocorrected%20command.-,Colors%20in%20Git,-Git%20fully%20supports' text='supports nine different colors' />: <BlogInlineCode>normal</BlogInlineCode>, <BlogInlineCode>black</BlogInlineCode>, <BlogInlineCode>red</BlogInlineCode>, <BlogInlineCode>green</BlogInlineCode>, <BlogInlineCode>yellow</BlogInlineCode>, <BlogInlineCode>blue</BlogInlineCode>, <BlogInlineCode>magenta</BlogInlineCode>, <BlogInlineCode>cyan</BlogInlineCode>, and <BlogInlineCode>white</BlogInlineCode>. The <BlogInlineCode>normal</BlogInlineCode> colors refers to your console default.</Typography>
		<BlogImage src={`${IMG_DIR}/git-colors.png`} alt='Git colors' caption='Git&apos;s supported colors' />
		<BlogAlert severity='info'>If you are using more than one color, you must <BlogInlineCode>%reset</BlogInlineCode> it so that the style doesn&apos;t bleed into other sections.  See the usage at the end of this article for an example.</BlogAlert>
		<Typography paragraph>On top of that, you can also specify one or more styles: <BlogInlineCode>bold</BlogInlineCode>, <BlogInlineCode>dim</BlogInlineCode>, <BlogInlineCode>ul</BlogInlineCode>, <BlogInlineCode>blink</BlogInlineCode>, <BlogInlineCode>reverse</BlogInlineCode>, <BlogInlineCode>italic</BlogInlineCode>, and <BlogInlineCode>strike</BlogInlineCode>.</Typography>
		<BlogImage src={`${IMG_DIR}/git-styles.png`} alt='Git styles' caption='Git&apos;s text styling' />
		<Typography paragraph>And as you can imagine, we can get pretty crazy with mixing and matching</Typography>
		<BlogImage src={`${IMG_DIR}/git-crazy.png`} alt='Mixed Git styles' />

		<Typography variant='h3'>Formatting strings</Typography>
		<Typography paragraph>To display data from Git, find the <BlogLink text='flag that corresponds to the data you want' href='https://git-scm.com/docs/git-log#Documentation/git-log.txt-emCgreenem:~:text=The%20placeholders-,are,-%3A' />.  Just a few examples of the numerous flags :</Typography>
		<BlogBulletList>
			<BlogBulletListItem><Typography variant='body1'><BlogInlineCode>%an</BlogInlineCode> - author name</Typography></BlogBulletListItem>
			<BlogBulletListItem><Typography variant='body1'><BlogInlineCode>%ae</BlogInlineCode> - author email</Typography></BlogBulletListItem>
			<BlogBulletListItem><Typography variant='body1'><BlogInlineCode>%cn</BlogInlineCode> - comitter name</Typography></BlogBulletListItem>
			<BlogBulletListItem><i>and many more...</i></BlogBulletListItem>
		</BlogBulletList>

		<Typography variant='h3'>Putting it all together</Typography>
		<Typography paragraph>Each piece of data receives it&apos;s style using <BlogInlineCode>%C</BlogInlineCode>, in the following format:</Typography>
		<BlogBulletList>
			<BlogBulletListItem><BlogInlineCode>{gitStyleFormat}</BlogInlineCode></BlogBulletListItem>
		</BlogBulletList>
		<Typography paragraph>So a red/italic styling of a human-readable styled author date (<BlogInlineCode>%ah</BlogInlineCode>) would be</Typography>
		<BlogBulletList>
			<BlogBulletListItem><BlogInlineCode>{gitStyleFormatExample}</BlogInlineCode></BlogBulletListItem>
		</BlogBulletList>
		<Typography paragraph>Then, once we add that to the <BlogInlineCode>--pretty=format</BlogInlineCode> flag in out Git config...</Typography>
		<Code
			language='bash'
			text={[
				'# ~/.gitconfig',
				'',
				'[alias]',
				'	nemo = log \\',
				'	--oneline \\',
				'	--pretty=format:\'%C(red italic)%ah\'',
			]}
		/>
		<Typography paragraph>We get this!</Typography>
		<BlogImage src={`${IMG_DIR}/git-one-flag-example.png`} alt='Single Git flag example' />

		<Typography variant='h3'>One last thing</Typography>
		<Typography paragraph>When you are formatting colors, the <BlogInlineCode>%C</BlogInlineCode> utility will apply formatting until you tell it to either stop, or change.  This won&apos;t be a problem if you style <i>everything</i> that you print, but if you have five fields and only want to style the very first field, then you will see the styling apply to all five fields.  Adding a <BlogInlineCode>%reset</BlogInlineCode> after the first call to <BlogInlineCode>%C</BlogInlineCode> will prevent your styling from bleeding over.</Typography>

		<Typography variant='h3'>Conclusion</Typography>
		<Typography paragraph>And that&apos;s it!  Now that you know how to pick data from <BlogInlineCode>git log</BlogInlineCode> and how to style it, you can go out and create some beautiful masterpieces.</Typography>
		<Typography paragraph>As a bonus, here is the configuration I personally use.</Typography>
		<Code
			language='bash'
			text={[
				'# ~/.gitconfig',
				'',
				'# Create an alias under the `[alias]` header.',
				'# I chose \'hs\' as short for "history"',
				'[alias]',
				'	hs = log \\',
				'	--oneline \\',
				'	--pretty=format:\'%C(magenta)%h %C(green)%cd %C(bold cyan)%d %Creset%C(white)%s - %C(italic dim white)%aN\' \\',
				'	--date=format:\'%b %d %Y\'',
			]}
		/>
		<BlogImage src={`${IMG_DIR}/git-pretty.png`} alt='pretty Git history' />
	</>,
	bodyTitle: 'Creating a more human-readable Git history',
	date: 'Wednesday Oct 4, 2023',
	description: 'How to decorate and optimize your Git output to reduce clutter and irrelevant information',
	heroSrc:`${IMG_DIR}/hero.png`,
	icon: <img src='/git.svg' alt='Git' height={24} width={24} />,
	menuTitle: 'Pretty Git History',
	tags: ['git'],
	url: '/blog/pretty-git-history',
}

export default prettyGitHistory
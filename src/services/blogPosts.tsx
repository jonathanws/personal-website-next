import prettyGitHistory from '@/blogPosts/prettyGitHistory'
import prettyLinkPreviews from '@/blogPosts/prettyLinkPreviews'
import typeguardingApiResponses from '@/blogPosts/typeguardingApiResponses'
import { authors } from './blogAuthors'

const blogPostTags = ['git', 'html', 'seo', 'typescript'] as const
type BlogPostTag = typeof blogPostTags[number]

const blogPrefix = '/blog/'
type BlogPageUrl = `${typeof blogPrefix}${
	| 'pretty-git-history'
	| 'pretty-link-previews'
	| 'validating-api-responses'
}`

interface BlogPost {
	author: keyof typeof authors
	body: React.ReactNode
	bodyTitle: string
	date: string
	description: string
	heroSrc: string,
	icon: React.ReactNode
	menuTitle: string
	tags: BlogPostTag[]
	url: BlogPageUrl // the unique identifier of a blog post
}

// ordered from newest to oldest
const getBlogPosts = (): BlogPost[] => [
	prettyLinkPreviews,
	typeguardingApiResponses,
	prettyGitHistory,
]

export {
	type BlogPageUrl,
	type BlogPost,
	type BlogPostTag,
	blogPostTags,
	blogPrefix,
	getBlogPosts,
}
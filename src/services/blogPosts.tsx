import React from 'react'
import prettyGitHistory from '@/blogPosts/prettyGitHistory'
import prettyLinkPreviews from '@/blogPosts/prettyLinkPreviews'
import typeguardingApiResponses from '@/blogPosts/typeguardingApiResponses'
import { authors } from './blogAuthors'

export const blogPostTags = ['git', 'html', 'seo', 'typescript'] as const
export type BlogPostTag = typeof blogPostTags[number]

export interface BlogPost {
	author: keyof typeof authors
	body: React.ReactNode
	bodyTitle: string
	date: string
	description: string
	heroSrc: string,
	icon: React.ReactNode
	menuTitle: string
	tags: BlogPostTag[]
	url: string // the unique identifier of a blog post
}

// ordered from newest to oldest
export const getBlogPosts = (): BlogPost[] => [
	prettyLinkPreviews,
	typeguardingApiResponses,
	prettyGitHistory,
]
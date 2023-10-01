import React from 'react'
import prettyGitHistory from '@/blogPosts/prettyGitHistory/prettyGitHistory'
import { authors } from './blogAuthors'

export const blogPostTags = ['git', 'typescript'] as const
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

export const getBlogPosts = (): BlogPost[] => [
	prettyGitHistory,
]
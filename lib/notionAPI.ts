import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { MdStringObject } from 'notion-to-md/build/types'

import { NUMBER_OF_POSTS_PER_PAGE } from '../constants/constants'
import type { Metadata } from './types/Post'

const token = process.env.NOTION_TOKEN as string
const notion = new Client({ auth: token })
const n2m = new NotionToMarkdown({ notionClient: notion })

export const getAllPosts = async () => {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${
      process.env.NOTION_DATABASE_ID as string
    }/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100 }),
      next: { revalidate: 60 * 60 * 6 },
    },
  )

  const posts = await response.json()

  const results = posts.results

  return results.map((result: any) => {
    return getPageMetaData(result)
  })
}

const getPageMetaData = (post: any): Metadata => {
  const getTags = (tags: { name: string }[]) => {
    const allTags = tags.map((tag) => {
      return tag.name
    })

    return allTags
  }

  return {
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tag.multi_select),
  }
}

export const getSinglePost = async (
  slug: string,
): Promise<{ metadata: Metadata; markdown: MdStringObject }> => {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${
      process.env.NOTION_DATABASE_ID as string
    }/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Slug', rich_text: { equals: slug } },
      }),
      next: { revalidate: 60 * 60 * 6 },
    },
  )

  const post = await response.json()
  const metadata = getPageMetaData(post.results[0])
  const mdBlocks = await n2m.pageToMarkdown(post.results[0].id)
  const mdString = n2m.toMarkdownString(mdBlocks)

  return { metadata, markdown: mdString }
}

/** Topページ用記事の取得 */
export const getPostsForTopPage = async (pageSize: number = 4) => {
  const allPosts = await getAllPosts()
  const fourPosts = allPosts.slice(0, pageSize)

  return fourPosts
}

/** ページ番号に応じた記事を取得 */
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts()

  // *4で1ページに4記事表示する
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE

  return allPosts.slice(startIndex, endIndex)
}

export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts()

  // 整数値を返却(配列の要素数を1ページ分の記事数で割った余りが0以上ならプラス1)
  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  )
}

export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts()
  // tagの1文字目を大文字にする
  const upperCaseTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1)
  // allPostsの要素分tagNameに一致するpostを持つ配列を新たに作成
  const posts = allPosts.filter((post: Metadata) => {
    // tagNameに一致するpostを返却（存在しない場合undefined)
    return !!post.tags.find((tag: string) => tag === upperCaseTagName)
  })

  // *4で1ページに4記事表示する
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE

  return posts.slice(startIndex, endIndex)
}

export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts()
  // tagの1文字目を大文字にする
  const upperCaseTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1)
  // allPostsの要素分tagNameに一致するpostを持つ配列を新たに作成
  const posts = allPosts.filter((post: Metadata) => {
    // tagNameに一致するpostを返却（存在しない場合undefined)
    return !!post.tags.find((tag: string) => tag === upperCaseTagName)
  })

  // 整数値を返却(配列の要素数を1ページ分の記事数で割った余りが0以上ならプラス1)
  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  )
}

export const getAllTags = async () => {
  const allPosts = await getAllPosts()
  // tags配列をmapで多重配列でなくflatMapで1つの配列とする
  const duplicateTags = allPosts.flatMap((post: Metadata) => post.tags)

  // 配列の重複要素をなくし、重複を1つにして配列を取得
  const set = new Set(duplicateTags)
  const allTags = Array.from(set)

  return allTags
}

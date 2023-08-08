import Link from 'next/link'
import React from 'react'

import { getAllPosts, getSinglePost } from '../../../../lib/notionAPI'
import type { Metadata } from '../../../../lib/types/Post'
import Markdown from './Markdown'

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts()

  return allPosts.map((post: Metadata) => ({
    slug: post.slug,
  }))
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getSinglePost(params.slug)

  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag, index) => (
        <p
          key={index}
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
        >
          {tag}
        </p>
      ))}
      <div className="mt-10 font-medium">
        <Markdown markdown={post.markdown.parent} />
        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  )
}

export default Post

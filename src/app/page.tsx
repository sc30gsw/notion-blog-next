import Link from 'next/link'
import React from 'react'

import SinglePost from '../../lib/components/Post/SinglePost'
import Tag from '../../lib/components/Tag/Tag'
import { getPostsForTopPage } from '../../lib/notionAPI'

const Home = async () => {
  const posts = await getPostsForTopPage()

  return (
    <main className="container w-full mt-16">
      <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
      {posts.map((post: any) => (
        <div key={post.id} className="mx-4">
          <SinglePost
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            slug={post.slug}
            isPaginationPage={false}
          />
        </div>
      ))}
      <Link
        href="/posts/page/1"
        className="mb-6 lg:w-1/2 mx-auto px-5 block text-right"
      >
        ...もっと見る
      </Link>
      <Tag />
    </main>
  )
}

export default Home

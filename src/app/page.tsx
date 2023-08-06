import React from 'react'

import SinglePost from '../../lib/components/Post/SinglePost'
import { getAllPosts } from '../../lib/notionAPI'

const Home = async () => {
  const posts = await getAllPosts()

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
          />
        </div>
      ))}
    </main>
  )
}

export default Home

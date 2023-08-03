import React from 'react'

import { getAllPosts } from '../../lib/notionAPI'

const Home = async () => {
  const posts = await getAllPosts()

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.url}</div>
      ))}
    </div>
  )
}

export default Home

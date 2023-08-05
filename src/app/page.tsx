import React from 'react'

import { getAllPosts } from '../../lib/notionAPI'

const Home = async () => {
  const posts = await getAllPosts()
  console.log(posts)

  return <div></div>
}

export default Home

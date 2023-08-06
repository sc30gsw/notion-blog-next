import React from 'react'

import { getAllPosts } from '../../lib/notionAPI'

const Home = async () => {
  const posts = await getAllPosts()

  return <div></div>
}

export default Home

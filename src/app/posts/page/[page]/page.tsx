import React from 'react'

import SinglePost from '../../../../../lib/components/Post/SinglePost'
import { getPostsForTopPage } from '../../../../../lib/notionAPI'

const BlogPageList = async () => {
  const posts = await getPostsForTopPage()
  return (
    <main className="container w-full mt-16">
      <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
      <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
        {posts.map((post: any) => (
          <div key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={true}
            />
          </div>
        ))}
      </section>
    </main>
  )
}

export default BlogPageList

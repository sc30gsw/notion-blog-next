import React from 'react'

import Pagination from '../../../../../lib/components/Pagination/Pagination'
import SinglePost from '../../../../../lib/components/Post/SinglePost'
import { getPostsByPage } from '../../../../../lib/notionAPI'

const BlogPageList = async ({ params }: { params: { page: string } }) => {
  const posts = await getPostsByPage(parseInt(params.page.toString(), 10))
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
      <Pagination />
    </main>
  )
}

export default BlogPageList

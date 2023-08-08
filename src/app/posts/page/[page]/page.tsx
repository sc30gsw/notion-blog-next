import React from 'react'

import Pagination from '../../../../../lib/components/Pagination/Pagination'
import SinglePost from '../../../../../lib/components/Post/SinglePost'
import { getNumberOfPages, getPostsByPage } from '../../../../../lib/notionAPI'

export const generateStaticParams = async () => {
  const numberOfPage = await getNumberOfPages()

  // Array.fromで長さがnumberOfPageの配列を作成
  // Array.fromの第二引数でmapと同じ挙動を起こす
  const pages: { page: string }[] = Array.from(
    { length: numberOfPage },
    (_, i) => {
      return { page: (i + 1).toString() }
    },
  )

  return pages
}

const BlogPageList = async ({ params }: { params: { page: string } }) => {
  const posts = await getPostsByPage(parseInt(params.page.toString(), 10))
  const numberOfPage = await getNumberOfPages()
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
      <Pagination numberOfPage={numberOfPage} tag="" />
    </main>
  )
}

export default BlogPageList

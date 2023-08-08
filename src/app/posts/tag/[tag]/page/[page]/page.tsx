import React from 'react'

import Pagination from '../../../../../../../lib/components/Pagination/Pagination'
import SinglePost from '../../../../../../../lib/components/Post/SinglePost'
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from '../../../../../../../lib/notionAPI'

export const generateStaticParams = async () => {
  const allTags = await getAllTags()

  // 各タグに対して、非同期でページ数を取得し、そのページ数分{tag, page}を作成
  const promises = allTags.map(async (tag) => {
    const numberOfPagesByTag = await getNumberOfPagesByTag(tag as string)

    // タグに関連するページ数分の{tag, page}配列を作成
    return Array.from({ length: numberOfPagesByTag }, (_, i) => ({
      tag: tag as string,
      page: (i + 1).toString(),
    }))
  })

  // すべての非同期処理の完了を待ち、結果を格納
  const paramsArrays: { tag: string; page: string }[][] = await Promise.all(
    promises,
  )

  // 二重配列を配列にする
  const params: { tag: string; page: string }[] = paramsArrays.flat()

  return params
}

const BlogTagPageList = async ({
  params,
}: {
  params: { tag: string; page: string }
}) => {
  const posts = await getPostsByTagAndPage(
    params.tag.toString(),
    parseInt(params.page.toString(), 10),
  )
  const numberOfPageByTag = await getNumberOfPagesByTag(params.tag.toString())
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
      <Pagination
        numberOfPage={numberOfPageByTag}
        tag={params.tag.toString()}
      />
    </main>
  )
}

export default BlogTagPageList

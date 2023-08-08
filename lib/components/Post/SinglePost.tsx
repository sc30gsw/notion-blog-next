import Link from 'next/link'
import React from 'react'

type Props = {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
  isPaginationPage: boolean
}

const SinglePost = ({
  title,
  description,
  date,
  tags,
  slug,
  isPaginationPage,
}: Props) => {
  return (
    <>
      {isPaginationPage ? (
        <section className="bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center">
            <h2 className="text-gray-100 text-2xl font-medium mb-2">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className="text-gray-400 mr-2">{date}</div>

            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/posts/tag/${
                  tag.charAt(0).toLowerCase() + tag.slice(1)
                }/page/1`}
              >
                <span className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium cursor-pointer mr-2">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </section>
      ) : (
        <section className="lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-100 text-2xl font-medium mb-2">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className="text-gray-100">{date}</div>

            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/posts/tag/${
                  tag.charAt(0).toLowerCase() + tag.slice(1)
                }/page/1`}
              >
                <span className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium cursor-pointer mr-2">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </section>
      )}
    </>
  )
}

export default SinglePost

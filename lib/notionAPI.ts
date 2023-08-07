const token = process.env.NOTION_TOKEN as string

export const getAllPosts = async () => {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${
      process.env.NOTION_DATABASE_ID as string
    }/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100 }),
      next: { revalidate: 60 * 60 * 6 },
    },
  )

  const posts = await response.json()

  const results = posts.results

  return results.map((result: any) => {
    return getPageMetaData(result)
  })
}

const getPageMetaData = (post: any) => {
  const getTags = (tags: { name: string }[]) => {
    const allTags = tags.map((tag) => {
      return tag.name
    })

    return allTags
  }

  return {
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tag.multi_select),
  }
}

export const getSinglePost = async (slug: string) => {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${
      process.env.NOTION_DATABASE_ID as string
    }/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Slug', rich_text: { equals: slug } },
      }),
      next: { revalidate: 60 * 60 * 6 },
    },
  )

  const post = await response.json()
  const metadata = getPageMetaData(post.results[0])

  return metadata
}

import { Article, NewsFormated } from '@/@types/news-types'
import { NewsList } from './news-list'
import { useEffect, useState } from 'react'

interface NewsFeedProps {
  articles: NewsFormated
}

export function NewsFeed({ articles }: NewsFeedProps) {
  const [newsFeed, setNewsFeed] = useState<Article[]>([])

  useEffect(() => {
    setNewsFeed(articles.articles)
  }, [articles])

  return (
    <section className="mt-16 flex w-full justify-center  pb-6">
      <NewsList articles={newsFeed} />
    </section>
  )
}

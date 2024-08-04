import { Article, NewsFormated } from '@/@types/news-types'
import { NewsList } from './news-list'
import { useEffect, useState } from 'react'
import { Paginator } from '@/components/paginator'

interface NewsFeedProps {
  articles: NewsFormated
}
const totalPages = 3
export function NewsFeed({ articles }: NewsFeedProps) {
  const [newsFeed, setNewsFeed] = useState<Article[]>([])
  const [allNews, setAllNews] = useState<Article[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    initComponent()
  }, [articles])

  function initComponent() {
    setAllNews(articles.articles)

    setNewsFeed(
      articles.articles.slice(
        0,
        Math.ceil(articles.articles.length / totalPages),
      ),
    )
  }

  useEffect(() => {
    const startIndex =
      (currentPage - 1) * Math.ceil(allNews.length / totalPages)
    const endIndex = startIndex + Math.ceil(allNews.length / totalPages)
    setNewsFeed(allNews.slice(startIndex, endIndex))
  }, [currentPage, allNews])

  function handleNext() {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  function handlePrevious() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  return (
    <section className="mt-16 flex w-full flex-col items-center justify-center pb-6">
      <NewsList articles={newsFeed} />
      <Paginator
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        nextAvaliable={currentPage !== totalPages}
        previousAvaliable={currentPage !== 1}
      />
    </section>
  )
}

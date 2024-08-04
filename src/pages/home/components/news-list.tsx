import { Article } from '@/@types/news-types'
import { NewsCard } from '@/components/news-feed/news-card'

interface NewsListProps {
  articles: Article[]
}

export function NewsList({ articles }: NewsListProps) {
  function renderArticles(_articles: Article[]) {
    if (!_articles) {
      return null
    }
    return _articles.map((item, i) => {
      return <NewsCard article={item} number={i + 1} key={item.title} />
    })
  }

  return (
    <ul className="flex w-full max-w-feed flex-col gap-3 px-6">
      {renderArticles(articles)}
    </ul>
  )
}

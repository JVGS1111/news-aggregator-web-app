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
    return _articles.map((item) => {
      return (
        <a
          target="_blank"
          href={item.url!}
          key={item.title}
          rel="noopener noreferrer"
        >
          <NewsCard article={item} number={item.number} />
        </a>
      )
    })
  }

  return (
    <ul className="flex w-full max-w-feed flex-col gap-3 ">
      {renderArticles(articles)}
    </ul>
  )
}

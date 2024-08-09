import { Article } from '@/@types/news-types'
import { shortenText } from '@/services/utils/shorten-text'
import dayjs from 'dayjs'

interface NewsCardProps {
  article: Article
  number?: number
}

export function NewsCard({ article, number }: NewsCardProps) {
  return (
    <article
      className="group flex cursor-pointer flex-row justify-start gap-2"
      data-testid="article-card"
    >
      {number && (
        <div className="min-w-6">
          <span className="text-lg text-title">{number}.</span>
        </div>
      )}
      <div className="flex flex-col ">
        <h2
          className="text-lg text-title group-hover:underline"
          data-testid="card-title"
        >
          {shortenText(article.title!, 150)}
        </h2>
        <div className="flex gap-1.5">
          <span className="text-xs font-medium text-newsSource">
            {article.source}
          </span>
          <span className="text-xs text-subtitle">-</span>
          <span className="text-xs text-subtitle">{article.author}</span>
          <span className="text-xs text-subtitle">-</span>
          <span className="text-xs text-subtitle">
            {dayjs(article.published_at).format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
    </article>
  )
}

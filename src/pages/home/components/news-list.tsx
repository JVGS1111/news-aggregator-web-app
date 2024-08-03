import { NewsCard } from '@/components/news-feed/news-card'

export function NewsList() {
  return (
    <ul className="flex w-full max-w-feed flex-col gap-3 px-6">
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </ul>
  )
}

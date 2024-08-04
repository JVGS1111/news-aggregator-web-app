import { Header } from '@/components/header'
import { NewsFeed } from './components/news-feed'
import { NewsFormated } from '@/@types/news-types'

interface HomeProps {
  initProps: NewsFormated
}

export default function Home({ initProps }: HomeProps) {
  return (
    <>
      <Header />
      <NewsFeed articles={initProps} />
    </>
  )
}

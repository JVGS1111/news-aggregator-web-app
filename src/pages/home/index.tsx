import { Header } from '@/components/header'
import { NewsFeed } from './components/news-feed'
import { NewsFormated } from '@/@types/news-types'
import Head from 'next/head'

interface HomeProps {
  initProps: NewsFormated
}

export default function Home({ initProps }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | News Aggregator</title>
      </Head>
      <Header />
      <NewsFeed articles={initProps} />
    </>
  )
}

import { Header } from '@/components/header'
import Head from 'next/head'
import { NewsFeedContainer } from './news-feed-container'

export default function CustomNewsFeed() {
  return (
    <>
      <Head>
        <title>feed | News Agreggator</title>
      </Head>
      <Header />
      <NewsFeedContainer />
    </>
  )
}

import { Header } from '@/components/header'
import { NewsFeed } from './components/news-feed'
import { useEffect } from 'react'
import { api } from '@/services/web/api'

export default function Home() {
  async function handleGetNews() {
    await api.get('/news/get-news')
  }

  return (
    <>
      <Header />
      <button onClick={handleGetNews}>chamar</button>
      {/* <NewsFeed /> */}
    </>
  )
}

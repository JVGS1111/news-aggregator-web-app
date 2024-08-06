import { useState } from 'react'
import { Navigator } from './components/navigator'
import { NewsFeed } from '../home/components/news-feed'
import { Article } from '@/@types/news-types'
import { Preferences } from './preferences'

type TabOptions = 'News Feed' | 'Preferences'
const tabs: TabOptions[] = ['News Feed', 'Preferences']
const mockArticle: Article[] = [
  {
    author: 'test author',
    published_at: new Date().toISOString(),
    source: 'text source',
    title: 'test title',
    url: 'test url',
    number: 1,
  },
  {
    author: 'test author',
    published_at: new Date().toISOString(),
    source: 'text source',
    title: 'test title',
    url: 'test url',
    number: 2,
  },
  {
    author: 'test author',
    published_at: new Date().toISOString(),
    source: 'text source',
    title: 'test title',
    url: 'test url',
    number: 3,
  },
]

export function NewsFeedContainer() {
  const [tab, setTab] = useState<TabOptions>(tabs[0])

  function handleChangeTab(newTab: string) {
    setTab(newTab as TabOptions)
  }

  function renderTab() {
    if (tab === 'News Feed') {
      return <NewsFeed articles={{ articles: mockArticle }} />
    }
    if (tab === 'Preferences') {
      return <Preferences />
    }

    return null
  }

  return (
    <section className="m-auto mt-8 flex w-full max-w-feed flex-col items-center justify-center px-5 pb-6">
      <Navigator
        options={tabs}
        onChange={handleChangeTab}
        defaultValue={tabs[0]}
      />
      {renderTab()}
    </section>
  )
}

import { useState } from 'react'
import { Preferences } from './preferences'
import { TabNavigator } from '@/components/TabNavigator'
import { NewsFeedController } from './news-feed-controller'

type TabOptions = 'News Feed' | 'Preferences'
const tabs: TabOptions[] = ['News Feed', 'Preferences']

export function Container() {
  const [tab, setTab] = useState<TabOptions>(tabs[0])

  function handleChangeTab(newTab: string) {
    setTab(newTab as TabOptions)
  }

  function renderTab() {
    if (tab === 'News Feed') {
      return <NewsFeedController />
    }
    if (tab === 'Preferences') {
      return <Preferences />
    }

    return null
  }

  return (
    <section className="m-auto mt-8 flex w-full max-w-feed flex-col items-center justify-center px-5 pb-6">
      <TabNavigator
        options={tabs}
        onChange={handleChangeTab}
        defaultValue={tabs[0]}
      />
      {renderTab()}
    </section>
  )
}

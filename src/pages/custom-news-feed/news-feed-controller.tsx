import { Article, Filters, NewsFormated } from '@/@types/news-types'
import { authorsKey, preferencesKey } from '@/services/storage/keys'
import { useEffect } from 'react'
import { NewsList } from '../home/components/news-list'
import {
  StorageUserAuthors,
  StorageUserPreferences,
} from '@/services/storage/types'
import { api } from '@/services/web/api'
import { getUserNewsFeed } from '@/services/web/news'
import { useQuery } from '@tanstack/react-query'

const mockArticle: Article[] = [
  {
    author: 'test author',
    published_at: new Date().toISOString(),
    source: 'text source',
    title: 'test title',
    url: 'test url',
  },
  {
    author: 'test author',
    published_at: new Date().toISOString(),
    source: 'text source',
    title: 'test title',
    url: 'test url',
  },
  {
    author: 'test author',
    published_at: new Date().toISOString(),
    source: 'text source',
    title: 'test title',
    url: 'test url',
  },
]

export function NewsFeedController() {
  // useEffect(() => {
  //   getUserPreferences()
  // }, [])

  function getUserPreferences() {
    const preferences = localStorage.getItem(preferencesKey)
    const authors = localStorage.getItem(authorsKey)
    const filters: Filters = createFilterObject(preferences, authors)
    return filters
    // fetchAticles(filters)
  }

  function createFilterObject(
    pref: string | null,
    authors: string | null,
  ): Filters {
    const filters: Filters = {
      authors: [],
      categories: [],
      sources: [],
    }
    if (pref) {
      const parsedPreferences: StorageUserPreferences = JSON.parse(pref)
      if (parsedPreferences.categories) {
        filters.categories = parsedPreferences.categories
      }
      if (parsedPreferences.sources) {
        filters.sources = parsedPreferences.sources
      }
    }
    if (authors) {
      const parsedAuthors: StorageUserAuthors = JSON.parse(authors)
      if (parsedAuthors.authors) {
        filters.authors = parsedAuthors.authors
      }
    }
    return filters
  }

  const filters = getUserPreferences()

  const { data, error, isLoading } = useQuery<NewsFormated>({
    queryKey: ['userNewsFeed', filters],
    queryFn: async () => {
      const { data } = await getUserNewsFeed(filters)
      console.log(data)
      return data
    },
  })

  return (
    <div className="w-full  py-3">
      <NewsList articles={data?.articles || []}></NewsList>
    </div>
  )
}

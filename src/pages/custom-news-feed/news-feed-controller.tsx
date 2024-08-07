'use client'
import { Filters, NewsFormated } from '@/@types/news-types'
import { authorsKey, preferencesKey } from '@/services/storage/keys'
import { NewsList } from '../home/components/news-list'
import {
  StorageUserAuthors,
  StorageUserPreferences,
} from '@/services/storage/types'
import { getUserNewsFeed } from '@/services/web/news'
import { useQuery } from '@tanstack/react-query'

export function NewsFeedController() {
  function getUserPreferences() {
    if (typeof window === 'undefined') {
      return {
        categories: [],
        sources: [],
        authors: [],
      }
    } else {
      const preferences = localStorage.getItem(preferencesKey)
      const authors = localStorage.getItem(authorsKey)
      const filters: Filters = createFilterObject(preferences, authors)
      return filters
    }
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

  const { data } = useQuery<NewsFormated>({
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

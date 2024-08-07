import { AxiosError, AxiosResponse } from 'axios'
import { api } from '../api'
import { Filters, NewsFormated } from '@/@types/news-types'

interface GetNewsWithFilterProps {
  keyword: string
  source?: string | undefined
  category?: string | undefined
  date?: Date | undefined
}

export async function getNewsWithFilter(
  params: GetNewsWithFilterProps,
): Promise<AxiosResponse<NewsFormated, AxiosError<{ message: string }>>> {
  const res = await api.post('/news/get-news', params)
  return res
}

interface GetUserNewsFeedProps extends Filters {}

export async function getUserNewsFeed(
  params: GetUserNewsFeedProps,
): Promise<AxiosResponse<NewsFormated, AxiosError<{ message: string }>>> {
  const res = await api.post('/news/get-user-news-feed', params)
  return res
}

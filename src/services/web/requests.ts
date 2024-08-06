import { OpenNewsApiResponse } from '@/@types/open-news-types'
import {
  GetNewsFromTheGuardianApiResponse,
  TheGuardianApiResponse,
} from '@/@types/the-guardian-types'
import {
  GetNewsFromTNYTApiResponse,
  TheNewYorkTimesApiResponse,
} from '@/@types/the-new-york-times-types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import {
  parseNewsApiData,
  parseTheGuardianData,
  parseTheNewYorkTimesTrendNews,
} from '../utils/parsers'

export async function getHomeProps() {
  try {
    // Execute all API calls in parallel
    const [newsApiResponse, theGuardianResponse, theNewYorkTimesResponse] =
      await Promise.all([
        getTrendNewsFromNewsApi(),
        getTrendNewsFromTheGuardianApi(),
        getTrendNewsFromTheNewYorkTimesApi(),
      ])

    // processing responses
    let newsArray = [
      ...parseNewsApiData(newsApiResponse.data),
      ...parseTheGuardianData(theGuardianResponse.data),
      ...parseTheNewYorkTimesTrendNews(theNewYorkTimesResponse.data),
    ]

    // Adds a sequential number to each item
    newsArray = newsArray.map((item, i) => {
      return {
        ...item,
        number: i + 1,
      }
    })

    return newsArray
  } catch (error) {
    console.error('Error fetching data from APIs:', error)
    return []
  }
}

async function getTrendNewsFromNewsApi(): Promise<
  AxiosResponse<OpenNewsApiResponse, AxiosError>
> {
  const res = await axios.get(`https://newsapi.org/v2/top-headlines`, {
    params: {
      apiKey: process.env.NEWS_API_API_KEY,
      country: [
        'at',
        'be',
        'bg',
        'ch',
        'cz',
        'de',
        'fr',
        'gb',
        'gr',
        'hu',
        'ie',
        'it',
        'lt',
        'lv',
        'nl',
        'no',
        'pl',
        'pt',
        'ro',
        'rs',
        'ru',
        'se',
        'si',
        'sk',
        'tr',
        'ua',
        'us',
      ],
    },
  })
  return res
}

async function getTrendNewsFromTheGuardianApi(): Promise<
  AxiosResponse<TheGuardianApiResponse, AxiosError>
> {
  const res = await axios.get('https://content.guardianapis.com/search', {
    params: {
      'order-by': 'newest',
      'api-key': process.env.THE_GUARDIAN_API_KEY,
      'page-size': 20,
    },
  })
  return res
}

async function getTrendNewsFromTheNewYorkTimesApi(): Promise<
  AxiosResponse<TheNewYorkTimesApiResponse, AxiosError>
> {
  const response = await axios.get(
    'https://api.nytimes.com/svc/topstories/v2/home.json',
    {
      params: {
        'api-key': process.env.THE_NEW_YORK_TIMES_API_KEY,
      },
    },
  )

  return response
}

export interface GetNewsFromNewsApiProps {
  q: string
  from?: string
  to?: string
  pageSize?: number
}

export async function getNewsFromNewsApi({
  q,
  from,
  to,
  pageSize = 20,
}: GetNewsFromNewsApiProps): Promise<
  AxiosResponse<OpenNewsApiResponse, AxiosError>
> {
  const params: Record<string, string | number> = {
    apiKey: process.env.NEWS_API_API_KEY!,
    q,
  }

  if (from) params.from = from
  if (to) params.to = to
  if (pageSize) params.pageSize = pageSize

  const res = await axios.get(`https://newsapi.org/v2/everything`, {
    params,
  })
  return res
}

export interface GetNewsFromTheGuardiamApiProps {
  q: string
  from?: string
  to?: string
  category?: string
  pageSize?: number
}

export async function getNewsFromTheGuardiaApi({
  q,
  from,
  to,
  category,
  pageSize = 20,
}: GetNewsFromTheGuardiamApiProps): Promise<
  AxiosResponse<GetNewsFromTheGuardianApiResponse, AxiosError>
> {
  const params: Record<string, string | number> = {
    'api-key': process.env.THE_GUARDIAN_API_KEY!,
    q,
  }
  if (from) params['from-date'] = from
  if (to) params.to = to
  if (category) params.section = category
  if (pageSize) params['page-size'] = pageSize

  const res = await axios.get(`https://content.guardianapis.com/search`, {
    params,
  })
  return res
}

export interface GetNewsFromTNYTApiProps {
  q: string
  from?: string
  to?: string
  category?: string
}

export async function getNewsFromTNYTApi({
  q,
  from,
  to,
  category,
}: GetNewsFromTNYTApiProps): Promise<
  AxiosResponse<GetNewsFromTNYTApiResponse, AxiosError>
> {
  const params: Record<string, string> = {
    'api-key': process.env.THE_NEW_YORK_TIMES_API_KEY!,
    q,
  }

  if (from) params.begin_date = from.replace(/-/g, '')
  if (to) params.end_date = to.replace(/-/g, '')
  if (category) params.fq = `section_name:("${category}")`

  const res = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    {
      params,
    },
  )
  return res
}

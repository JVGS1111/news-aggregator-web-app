import { Article } from '@/@types/news-types'
import { OpenNewsApiResponse } from '@/@types/open-news-types'
import { TheGuardianApiResponse } from '@/@types/the-guardian-types'
import { TheNewYorkTimesApiResponse } from '@/@types/the-new-york-times-types'
import axios, { AxiosError, AxiosResponse } from 'axios'

export async function getHomeProps() {
  const newsApiResponse = await fetchNewsFromNewsApi()
  const theGuardiaResponse = await fetchNewsFromTheGuardianApi()
  const theNewYorkTimesResponse = await fetchNewsFromTheNewYorkTimesApi()

  const newsArray = [
    ...parseNewsApiData(newsApiResponse.data),
    ...parseTheGuardianData(theGuardiaResponse.data),
    ...parseTheNewYorkTimesDate(theNewYorkTimesResponse.data),
  ]

  return newsArray
}

async function fetchNewsFromNewsApi(): Promise<
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

async function fetchNewsFromTheGuardianApi(): Promise<
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

async function fetchNewsFromTheNewYorkTimesApi(): Promise<
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

function parseNewsApiData(newsApiRes: OpenNewsApiResponse): Article[] {
  if (!newsApiRes || newsApiRes.articles.length === 0) {
    return []
  }
  const parsedArticles: Article[] = newsApiRes.articles.map((item) => {
    return {
      author: `By ${item.author}`,
      published_at: item.publishedAt,
      source: item.source.name,
      title: item.title,
      url: item.url,
    }
  })

  return parsedArticles
}

function parseTheGuardianData(
  theGuardianRes: TheGuardianApiResponse,
): Article[] {
  if (!theGuardianRes || theGuardianRes.response.results.length === 0) {
    return []
  }

  const parsedArticles: Article[] = theGuardianRes.response.results.map(
    (item) => {
      return {
        author: 'By The Guardian',
        published_at: item.webPublicationDate,
        title: item.webTitle,
        source: 'The Guardian',
        url: item.webUrl,
      }
    },
  )

  return parsedArticles
}

function parseTheNewYorkTimesDate(
  theNYTRes: TheNewYorkTimesApiResponse,
): Article[] {
  if (!theNYTRes || theNYTRes.results.length === 0) {
    return []
  }
  const parsedArtices: Article[] = theNYTRes.results.map((item) => {
    return {
      author: item.byline,
      published_at: item.published_date,
      source: 'The New Times',
      title: item.title,
      url: item.url,
    }
  })

  return parsedArtices
}

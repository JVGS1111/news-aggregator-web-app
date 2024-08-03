import { OpenNewsApiResponse } from '@/@types/open-news-types'
import { TheGuardianApiResponse } from '@/@types/the-guardian-types'
import { TheNewYorkTimesApiResponse } from '@/@types/the-new-york-times-types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newsApiResponse = await fetchNewsFromNewsApi()
  const theGuardiaResponse = await fetchNewsFromTheGuardianApi()
  const theNewYorkTimesResponse = await fetchNewsFromTheNewYorkTimesApi()
  return res
    .status(201)
    .json([
      newsApiResponse.data,
      theGuardiaResponse.data,
      theNewYorkTimesResponse.data,
    ])
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

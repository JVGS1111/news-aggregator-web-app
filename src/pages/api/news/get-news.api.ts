/* eslint-disable no-case-declarations */
import { Article, NewsFormated } from '@/@types/news-types'
import { categoryMapping } from '@/services/utils/category-mapping'
import {
  parseGetNewsFromTNYTApiResponse,
  parseNewsApiData,
  parseTheGuardianData,
} from '@/services/utils/parsers'
import {
  getNewsFromNewsApi,
  getNewsFromTheGuardiaApi,
  getNewsFromTNYTApi,
} from '@/services/web/requests'
import { format } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

const validSources = ['the_new_york_times', 'the_guardian', 'open_news']

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { keyword, source } = req.body

  if (!keyword) {
    return res.status(400).json({ message: 'keyword is required' })
  }

  if (!source) {
    // return articles from all apis
    const allArticles = await getNewsFromAllSources(req)

    const newsResponse: NewsFormated = {
      articles: allArticles,
    }
    return res.status(201).json(newsResponse)
  }

  if (!validSources.includes(source)) {
    return res.status(400).json({ message: 'Source invalid' })
  }

  const articles: Article[] = await getArticlesFromSource(req)

  return res.status(201).json({
    articles,
  })
}

async function getArticlesFromSource(req: NextApiRequest) {
  const { category, date, keyword, source } = req.body
  let articles: Article[] = []
  switch (source) {
    case 'the_new_york_times':
      const theNewYorkTimesResponse = await getNewsFromTNYTApi({
        q: keyword,
        category: category ? categoryMapping[category].tnyt : undefined,
        from: date ? format(date, 'yyyyMMdd') : undefined,
        to: date ? format(date, 'yyyyMMdd') : undefined,
      })
      const theNewYorkTimesArticles = parseGetNewsFromTNYTApiResponse(
        theNewYorkTimesResponse.data,
      )
      articles = theNewYorkTimesArticles
      break
    case 'the_guardian':
      const theGuardianResponse = await getNewsFromTheGuardiaApi({
        q: keyword,
        category: category ? categoryMapping[category].tg : undefined,
        from: date ? format(date, 'yyyy-MM-dd') : undefined,
        to: date ? format(date, 'yyyy-MM-dd') : undefined,
      })
      const theGuadianArticles = parseTheGuardianData(theGuardianResponse.data)
      articles = theGuadianArticles
      break
    case 'open_news':
      const newsApiResponse = await getNewsFromNewsApi({
        q: `${keyword},${category}`,
        from: date ? format(date, 'yyyy-MM-dd') : undefined,
        to: date ? format(date, 'yyyy-MM-dd') : undefined,
      })
      const newsApiArticles = parseNewsApiData(newsApiResponse.data)
      articles = newsApiArticles
      break
    default:
      const resAllNews = await getNewsFromAllSources(req)
      articles = resAllNews
      break
  }

  return articles
}

async function getNewsFromAllSources(req: NextApiRequest) {
  const { category, date, keyword } = req.body
  try {
    const [newsApiResponse, theGuardianResponse, theNewYorkTimesResponse] =
      await Promise.all([
        getNewsFromNewsApi({
          q: `${keyword},${category}`,
          from: date ? format(date, 'yyyy-MM-dd') : undefined,
          to: date ? format(date, 'yyyy-MM-dd') : undefined,
        }),
        getNewsFromTheGuardiaApi({
          q: keyword,
          category: category ? categoryMapping[category].tg : undefined,
          from: date ? format(date, 'yyyy-MM-dd') : undefined,
          to: date ? format(date, 'yyyy-MM-dd') : undefined,
        }),
        getNewsFromTNYTApi({
          q: keyword,
          category: category ? categoryMapping[category].tnyt : undefined,
          from: date ? format(date, 'yyyyMMdd') : undefined,
          to: date ? format(date, 'yyyyMMdd') : undefined,
        }),
      ])
    const newsArray = [
      ...parseNewsApiData(newsApiResponse.data),
      ...parseTheGuardianData(theGuardianResponse.data),
      ...parseGetNewsFromTNYTApiResponse(theNewYorkTimesResponse.data),
    ]

    return newsArray
  } catch (error) {
    console.error('Error fetching data from APIs:', error)
    return []
  }
}

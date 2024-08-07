import { Article, Filters, NewsFormated } from '@/@types/news-types'
import {
  parseGetNewsFromTNYTApiResponse,
  parseNewsApiData,
  parseTheGuardianData,
} from '@/services/utils/parsers'
import {
  getHomeProps,
  getNewsFromNewsApi,
  getNewsFromTheGuardiaApi,
  getNewsFromTNYTApi,
} from '@/services/web/requests'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const { authors, categories, sources } = req.body as Filters
  if (
    authors.length === 0 &&
    categories.length === 0 &&
    (sources.length === 0 || sources.length === 3)
  ) {
    // user does not have any preferences
    const newsArray = await getHomeProps()
    const newsResponse: NewsFormated = {
      articles: newsArray,
    }

    return res.status(201).json(newsResponse)
  }

  return getBySource(req, res)
}

async function getBySource(req: NextApiRequest, res: NextApiResponse) {
  const { authors, categories, sources } = req.body as Filters
  const articles: Article[] = []
  if (sources.includes('the_guardian')) {
    const theGuardianResponse = await getNewsFromTheGuardiaApi({
      q: categories.join(' OR '),
    })
    const theGuadianArticles = parseTheGuardianData(theGuardianResponse.data)
    articles.push(...theGuadianArticles)
  }
  if (sources.includes('the_new_york_times')) {
    const theNewYorkTimesResponse = await getNewsFromTNYTApi({
      authors,
      categories,
    })
    const theNewYorkTimesArticles = parseGetNewsFromTNYTApiResponse(
      theNewYorkTimesResponse.data,
    )
    articles.push(...theNewYorkTimesArticles)
  }
  if (sources.includes('open_news')) {
    const newsApiResponse = await getNewsFromNewsApi({
      authors,
      categories,
    })
    const newsApiArticles = parseNewsApiData(newsApiResponse.data)
    articles.push(...newsApiArticles)
  }

  return res.status(201).json({ articles })
}

import { NewsFormated } from '@/@types/news-types'
import { getHomeProps } from '@/services/web/requests'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newsArray = await getHomeProps()
  const newsResponse: NewsFormated = {
    articles: newsArray,
  }

  return res.status(201).json(newsResponse)
}

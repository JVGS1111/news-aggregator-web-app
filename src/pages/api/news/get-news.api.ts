import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_API_API_KEY}`,
  )
  console.log('newsapi', response.data)

  return res.status(201).json({})
}

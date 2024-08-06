import { Article } from '@/@types/news-types'
import { OpenNewsApiResponse } from '@/@types/open-news-types'
import { TheGuardianApiResponse } from '@/@types/the-guardian-types'
import {
  GetNewsFromTNYTApiResponse,
  TheNewYorkTimesApiResponse,
} from '@/@types/the-new-york-times-types'

export function parseNewsApiData(newsApiRes: OpenNewsApiResponse): Article[] {
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

export function parseTheGuardianData(
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

export function parseTheNewYorkTimesTrendNews(
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

export function parseGetNewsFromTNYTApiResponse(
  theNYTRes: GetNewsFromTNYTApiResponse,
) {
  if (!theNYTRes || theNYTRes.response.docs.length === 0) {
    return []
  }
  const parsedArtices: Article[] = theNYTRes.response.docs.map((item) => {
    return {
      author: item.byline.original,
      published_at: item.pub_date,
      source: 'The New York Times',
      title: item.abstract,
      url: item.web_url,
    }
  })

  return parsedArtices
}

import { OpenNewsApiResponse } from '@/@types/open-news-types'
import {
  parseNewsApiData,
  parseTheGuardianData,
  parseTheNewYorkTimesDate,
} from './parsers'
import { Article } from '@/@types/news-types'
import { TheGuardianApiResponse } from '@/@types/the-guardian-types'
import { TheNewYorkTimesApiResponse } from '@/@types/the-new-york-times-types'

describe('parseNewsApiData', () => {
  it('should return an empty array if newsApiRes is null or has no articles', () => {
    expect(parseNewsApiData(null as unknown as OpenNewsApiResponse)).toEqual([])
    expect(
      parseNewsApiData({ status: 'ok', totalResults: 0, articles: [] }),
    ).toEqual([])
  })

  it('should parse the news API response correctly', () => {
    const newsApiRes: OpenNewsApiResponse = {
      status: 'ok',
      totalResults: 2,
      articles: [
        {
          source: {
            id: '1',
            name: 'TechCrunch',
          },
          author: 'Jane Doe',
          title: 'Latest Tech News',
          description: 'An overview of the latest technology news.',
          url: 'https://techcrunch.com/latest-tech-news',
          urlToImage: 'https://techcrunch.com/images/latest-tech-news.jpg',
          publishedAt: '2024-08-04T12:00:00Z',
          content: 'Full article content here.',
        },
        {
          source: {
            id: null,
            name: 'BBC News',
          },
          author: null,
          title: 'World News Update',
          description: 'Latest updates from around the world.',
          url: 'https://bbc.com/world-news-update',
          urlToImage: null,
          publishedAt: '2024-08-04T13:00:00Z',
          content: 'Full article content here.',
        },
      ],
    }

    const expectedOutput: Article[] = [
      {
        author: 'By Jane Doe',
        published_at: '2024-08-04T12:00:00Z',
        source: 'TechCrunch',
        title: 'Latest Tech News',
        url: 'https://techcrunch.com/latest-tech-news',
      },
      {
        author: 'By null',
        published_at: '2024-08-04T13:00:00Z',
        source: 'BBC News',
        title: 'World News Update',
        url: 'https://bbc.com/world-news-update',
      },
    ]

    expect(parseNewsApiData(newsApiRes)).toEqual(expectedOutput)
  })
})

describe('parseTheGuardianData', () => {
  it('should return an empty array if theGuardianRes is null or has no results', () => {
    expect(
      parseTheGuardianData(null as unknown as TheGuardianApiResponse),
    ).toEqual([])
    expect(
      parseTheGuardianData({
        response: {
          status: 'ok',
          userTier: 'free',
          total: 0,
          startIndex: 0,
          pageSize: 10,
          currentPage: 1,
          pages: 1,
          orderBy: 'newest',
          results: [],
        },
      }),
    ).toEqual([])
  })

  it('should parse The Guardian API response correctly', () => {
    const theGuardianRes: TheGuardianApiResponse = {
      response: {
        status: 'ok',
        userTier: 'free',
        total: 1,
        startIndex: 1,
        pageSize: 10,
        currentPage: 1,
        pages: 1,
        orderBy: 'newest',
        results: [
          {
            id: '1',
            type: 'article',
            sectionId: 'technology',
            sectionName: 'Technology',
            webPublicationDate: '2024-08-04T12:00:00Z',
            webTitle: 'Latest Tech News',
            webUrl: 'https://theguardian.com/technology/latest-tech-news',
            apiUrl:
              'https://content.guardianapis.com/technology/latest-tech-news',
            isHosted: false,
            pillarId: 'pillar/news',
            pillarName: 'News',
          },
        ],
      },
    }

    const expectedOutput = [
      {
        author: 'By The Guardian',
        published_at: '2024-08-04T12:00:00Z',
        title: 'Latest Tech News',
        source: 'The Guardian',
        url: 'https://theguardian.com/technology/latest-tech-news',
      },
    ]

    expect(parseTheGuardianData(theGuardianRes)).toEqual(expectedOutput)
  })
})

describe('parseTheNewYorkTimesDate', () => {
  it('should return an empty array if theNYTRes is null or has no results', () => {
    expect(
      parseTheNewYorkTimesDate(null as unknown as TheNewYorkTimesApiResponse),
    ).toEqual([])
    expect(
      parseTheNewYorkTimesDate({
        status: 'ok',
        copyright: '© 2024 The New York Times Company',
        section: 'world',
        last_updated: '2024-08-04T12:00:00Z',
        num_results: 0,
        results: [],
      }),
    ).toEqual([])
  })

  it('should parse The New York Times API response correctly', () => {
    const theNYTRes: TheNewYorkTimesApiResponse = {
      status: 'ok',
      copyright: '© 2024 The New York Times Company',
      section: 'world',
      last_updated: '2024-08-04T12:00:00Z',
      num_results: 1,
      results: [
        {
          section: 'Technology',
          subsection: '',
          title: 'Latest Tech News',
          abstract: 'An overview of the latest technology news.',
          url: 'https://nytimes.com/2024/08/04/technology/latest-tech-news.html',
          uri: 'nyt://article/123456',
          byline: 'By Jane Doe',
          item_type: 'Article',
          updated_date: '2024-08-04T12:00:00Z',
          created_date: '2024-08-04T10:00:00Z',
          published_date: '2024-08-04T11:00:00Z',
          material_type_facet: '',
          kicker: '',
          des_facet: ['Technology'],
          org_facet: [],
          per_facet: [],
          geo_facet: [],
          multimedia: [],
          short_url: 'https://nyti.ms/3xyz123',
        },
      ],
    }

    const expectedOutput = [
      {
        author: 'By Jane Doe',
        published_at: '2024-08-04T11:00:00Z',
        source: 'The New Times',
        title: 'Latest Tech News',
        url: 'https://nytimes.com/2024/08/04/technology/latest-tech-news.html',
      },
    ]

    expect(parseTheNewYorkTimesDate(theNYTRes)).toEqual(expectedOutput)
  })
})

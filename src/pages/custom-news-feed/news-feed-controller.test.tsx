import { render, screen, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { NewsFeedController } from './news-feed-controller'
import { preferencesKey, authorsKey } from '@/services/storage/keys'
import { Article, NewsFormated } from '@/@types/news-types'

// useQuery and requests mock
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}))

jest.mock('../../services/web/news/', () => ({
  getUserNewsFeed: jest.fn(),
}))

const mockArticles: Article[] = [
  {
    author: 'test author 1',
    published_at: new Date().toISOString(),
    source: 'text source 1',
    title: 'Test Article 1',
    url: 'test url 1',
    number: 1,
  },
  {
    author: 'test author 2',
    published_at: new Date().toISOString(),
    source: 'text source 2',
    title: 'Test Article 2',
    url: 'test url 2',
    number: 2,
  },
]
const mockNewsData: NewsFormated = {
  articles: mockArticles,
}
let useQueyMock = useQuery as jest.Mock
describe('NewsFeedController', () => {
  beforeEach(() => {
    // clear localstorage and mocks
    jest.clearAllMocks()
    window.localStorage.clear()
    useQueyMock = useQuery as jest.Mock
  })

  it('renders loading state initially', () => {
    // mock the loading state
    useQueyMock.mockReturnValue({
      data: undefined,
      isLoading: true,
    })

    render(<NewsFeedController />)

    // check if the loading is in the creen
    expect(screen.getByText('Loading more articles...')).toBeInTheDocument()
  })

  it('renders articles correctly when data is available', async () => {
    // mock localstorage values
    const mockPreferences = {
      categories: ['world'],
      sources: ['the_new_york_times'],
    }
    const mockAuthors = {
      authors: ['John Doe'],
    }
    window.localStorage.setItem(preferencesKey, JSON.stringify(mockPreferences))
    window.localStorage.setItem(authorsKey, JSON.stringify(mockAuthors))

    useQueyMock.mockReturnValue({
      data: mockNewsData,
      isLoading: false,
    })

    render(<NewsFeedController />)

    // check if there are articles in the screen
    await waitFor(() => {
      expect(screen.getByText(mockArticles[0].title!)).toBeInTheDocument()
      expect(screen.getByText(mockArticles[1].title!)).toBeInTheDocument()
    })
  })

  it('handles empty articles list', () => {
    // mocking an empty return
    useQueyMock.mockReturnValue({
      data: { articles: [] },
      isLoading: false,
    })

    render(<NewsFeedController />)

    // check if there is no articles on the screen
    expect(
      screen.queryByText('Loading more articles...'),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Sample News')).not.toBeInTheDocument()
  })

  it('uses default filters when localStorage is empty', () => {
    // mocking loading state with no filters
    useQueyMock.mockReturnValue({
      data: undefined,
      isLoading: true,
    })

    render(<NewsFeedController />)

    // check if the useQuery was called with the default filter
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['userNewsFeed', { categories: [], sources: [], authors: [] }],
      queryFn: expect.any(Function),
    })
  })
})

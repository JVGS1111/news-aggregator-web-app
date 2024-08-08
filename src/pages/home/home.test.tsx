import { render, screen } from '@testing-library/react'
import Home from '.'
import { NewsFormated } from '@/@types/news-types'

jest.mock('../../components/header', () => ({
  Header: () => <div>Mocked Header</div>,
}))

jest.mock('./components/news-feed', () => ({
  NewsFeed: ({ articles }: { articles: NewsFormated }) => (
    <div>Mocked NewsFeed with {articles.articles.length} articles</div>
  ),
}))

const mockArticles: NewsFormated = {
  articles: [
    {
      title: 'Article 1',
      url: '#',
      number: 1,
      author: 'test',
      published_at: new Date().toISOString(),
      source: 'Test source',
    },
    {
      title: 'Article 2',
      url: '#',
      number: 2,
      author: 'test',
      published_at: new Date().toISOString(),
      source: 'Test source',
    },
  ],
}

describe('Home Page', () => {
  it('should render the Header component', () => {
    render(<Home initProps={mockArticles} />)

    expect(screen.getByText('Mocked Header')).toBeInTheDocument()
  })

  it('should render the NewsFeed component with articles', () => {
    render(<Home initProps={mockArticles} />)

    expect(
      screen.getByText('Mocked NewsFeed with 2 articles'),
    ).toBeInTheDocument()
  })
})

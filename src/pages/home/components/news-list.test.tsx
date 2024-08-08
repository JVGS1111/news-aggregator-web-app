import { render, screen } from '@testing-library/react'
import { NewsList } from './news-list'
import { Article } from '@/@types/news-types'

jest.mock('../../../components/news-feed/news-card', () => ({
  NewsCard: ({ article }: { article: Article }) => (
    <div data-testid="news-card">{article.title}</div>
  ),
}))

describe('NewsList', () => {
  const articles: Article[] = [
    {
      title: 'Article 1',
      url: 'http://article1.com',
      number: 1,
      author: 'author',
      published_at: new Date().toISOString(),
      source: '',
    },
    {
      title: 'Article 2',
      url: 'http://article2.com',
      number: 2,
      author: 'author',
      published_at: new Date().toISOString(),
      source: '',
    },
    // Adicione mais artigos se necessário
  ]

  it('renders the correct number of articles', () => {
    render(<NewsList articles={articles} />)

    const newsCards = screen.getAllByTestId('news-card')
    expect(newsCards).toHaveLength(articles.length)
  })

  it('renders each article with the correct link and title', () => {
    render(<NewsList articles={articles} />)

    articles.forEach((article) => {
      const link = screen.getByRole('link', { name: article.title! })
      expect(link).toHaveAttribute('href', article.url)
    })
  })
})

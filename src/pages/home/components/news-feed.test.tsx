import { render, screen, fireEvent } from '@testing-library/react'
import { NewsFeed } from './news-feed'
import { Article, NewsFormated } from '@/@types/news-types'

const mockArticles: NewsFormated = {
  articles: [
    { title: 'Article 1', url: '#', number: 1 } as Article,
    { title: 'Article 2', url: '#', number: 2 } as Article,
    { title: 'Article 3', url: '#', number: 3 } as Article,
    { title: 'Article 4', url: '#', number: 4 } as Article,
    { title: 'Article 5', url: '#', number: 5 } as Article,
    { title: 'Article 6', url: '#', number: 6 } as Article,
  ],
}

describe('NewsFeed', () => {
  it('should render the front page articles correctly', () => {
    render(<NewsFeed articles={mockArticles} />)

    const articles = screen.getAllByRole('link')
    expect(articles).toHaveLength(2)
    expect(articles[0]).toHaveTextContent('Article 1')
    expect(articles[1]).toHaveTextContent('Article 2')
  })

  it('should move to the next page when clicking "Next"', () => {
    render(<NewsFeed articles={mockArticles} />)

    const nextButton = screen.getByText(/next/i)
    fireEvent.click(nextButton)

    const articles = screen.getAllByRole('link')
    expect(articles).toHaveLength(2)
    expect(articles[0]).toHaveTextContent('Article 3')
    expect(articles[1]).toHaveTextContent('Article 4')
  })

  it('should switch to the previous page when clicking "Previous"', () => {
    render(<NewsFeed articles={mockArticles} />)

    const nextButton = screen.getByText(/next/i)
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    const prevButton = screen.getByText(/previous/i)
    fireEvent.click(prevButton)

    const articles = screen.getAllByRole('link')
    expect(articles).toHaveLength(2)
    expect(articles[0]).toHaveTextContent('Article 3')
    expect(articles[1]).toHaveTextContent('Article 4')
  })

  it('must disable the "Next" button on the last page', () => {
    render(<NewsFeed articles={mockArticles} />)

    const nextButton = screen.getByText(/next/i)
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    expect(nextButton).toBeDisabled()
  })

  it('must disable the "Previous" button on the first page', () => {
    render(<NewsFeed articles={mockArticles} />)

    const prevButton = screen.getByText(/previous/i)
    expect(prevButton).toBeDisabled()
  })
})

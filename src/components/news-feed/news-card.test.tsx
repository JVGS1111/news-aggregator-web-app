import { render, screen } from '@testing-library/react'
import { NewsCard } from './news-card'
import { Article } from '@/@types/news-types'
import dayjs from 'dayjs'

const articleDate = new Date().toISOString()
const mockArticle: Article = {
  author: 'test author',
  published_at: articleDate,
  source: 'text source',
  title: 'test title',
  url: 'test url',
  number: 1,
}
describe('News Card component', () => {
  it('should display all the props correctly', () => {
    render(<NewsCard number={1} article={mockArticle} />)
    const title = screen.getByText(mockArticle.title!)
    const source = screen.getByText(mockArticle.source!)
    const number = screen.getByText(mockArticle.number! + '.')
    const author = screen.getByText(mockArticle.author!)

    expect(title).toBeInTheDocument()
    expect(source).toBeInTheDocument()
    expect(number).toBeInTheDocument()
    expect(author).toBeInTheDocument()
  })

  it('should display the correct date', () => {
    render(<NewsCard number={1} article={mockArticle} />)
    const parsedDate = dayjs(mockArticle.published_at).format('DD/MM/YYYY')
    const date = screen.getByText(parsedDate)

    expect(date).toBeInTheDocument()
  })

  it('should cut the title if it is to long', () => {
    mockArticle.title =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sapien tortor. Cras eu gravida augue. Cras dictum dolor id urna dictum, eget scelerisque nibh tempor. Integer vestibulum nisi id lectus euismod dignissim. Integer lobortis, diam et lobortis tempor, erat magna aliquet lectus, eu dapibus urna ex sit amet dolor. Nulla facilisi. Curabitur non convallis ex. Proin in cursus ligula.'
    // 60 words
    render(<NewsCard number={1} article={mockArticle} />)
    const title = screen.getByTestId('card-title')

    expect(title.innerHTML.length).toBe(150)
  })

  it('should not cut the title if it is not to long', () => {
    mockArticle.title = 'Lorem ipsum dolor sit mi.'
    // 25 caracters
    render(<NewsCard number={1} article={mockArticle} />)
    const title = screen.getByTestId('card-title')

    expect(title.innerHTML.length).toBe(25)
  })
})

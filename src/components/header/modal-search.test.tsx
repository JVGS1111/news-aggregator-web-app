import { render, screen, waitFor } from '@testing-library/react'
import { ModalSearch } from './modal-search'
import { userEvent } from '@testing-library/user-event'
import { Dialog } from '../ui/dialog'
import { Article } from '@/@types/news-types'
import { getNewsWithFilter } from '@/services/web/news'

jest.mock('../../services/web/news/')

describe('Modal Search', () => {
  const articleDate = new Date().toISOString()
  const mockArticles: Article[] = [
    {
      author: 'test author 1',
      published_at: articleDate,
      source: 'text source 1',
      title: 'Test Article 1',
      url: 'test url 1',
      number: 1,
    },
    {
      author: 'test author 2',
      published_at: articleDate,
      source: 'text source 2',
      title: 'Test Article 2',
      url: 'test url 2',
      number: 2,
    },
  ]
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    render(
      <Dialog defaultOpen>
        <ModalSearch />
      </Dialog>,
    )
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    expect(screen.getByText('Search for your article')).toBeInTheDocument()
  })

  it('displays an error message when the keyword is too short', async () => {
    await userEvent.setup()
    render(
      <Dialog defaultOpen>
        <ModalSearch />
      </Dialog>,
    )
    const inputSearch = screen.getByPlaceholderText('Search')
    const submitBtn = screen.getByTestId('submit_btn')
    await userEvent.type(inputSearch, 'ab')
    await userEvent.click(submitBtn)

    const errorMessage = await screen.findByText('The text is too short')
    expect(errorMessage).toBeInTheDocument()
  })

  it('toggles the filters when the filter button is clicked', async () => {
    await userEvent.setup()
    render(
      <Dialog defaultOpen>
        <ModalSearch />
      </Dialog>,
    )
    const filterBtn = screen.getByTestId('open_close_filters')
    expect(filterBtn).toBeInTheDocument()
    await userEvent.click(filterBtn)
    const filters = await screen.findByTestId('filters')
    expect(filters).toBeInTheDocument()
    await userEvent.click(filterBtn)
    const emptyEl = await screen.queryByTestId('filters')
    expect(emptyEl).not.toBeInTheDocument()
  })

  it('displays articles when the search is successful', async () => {
    await userEvent.setup()
    const mockedFn = getNewsWithFilter as jest.Mock

    mockedFn.mockResolvedValueOnce({
      data: { articles: mockArticles },
    })

    render(
      <Dialog defaultOpen>
        <ModalSearch />
      </Dialog>,
    )
    const inputSearch = screen.getByPlaceholderText('Search')
    const submitBtn = screen.getByTestId('submit_btn')
    await userEvent.type(inputSearch, 'test')
    await userEvent.click(submitBtn)
    const article = await screen.findByText('Test Article 1')
    expect(article).toBeInTheDocument()
  })

  it('the form should be cleared if the clear button is clicked', async () => {
    await userEvent.setup()
    render(
      <Dialog defaultOpen>
        <ModalSearch />
      </Dialog>,
    )
    let inputSearch = screen.getByPlaceholderText('Search')
    await userEvent.type(inputSearch, 'test')
    inputSearch = screen.getByPlaceholderText('Search')
    expect(inputSearch).toHaveValue('test')

    const clearFormBtn = await screen.findByTestId('clear_form')
    expect(clearFormBtn).toBeInTheDocument()

    await userEvent.click(clearFormBtn)
    inputSearch = screen.getByPlaceholderText('Search')
    expect(inputSearch).not.toHaveValue('test')
  })

  it('displays a message when no articles are found', async () => {
    await userEvent.setup()
    const mockedFn = getNewsWithFilter as jest.Mock

    mockedFn.mockResolvedValueOnce({
      data: { articles: [] },
    })

    render(
      <Dialog defaultOpen>
        <ModalSearch />
      </Dialog>,
    )
    const inputSearch = screen.getByPlaceholderText('Search')
    const submitBtn = screen.getByTestId('submit_btn')
    await userEvent.type(inputSearch, 'test')
    await userEvent.click(submitBtn)

    const messageEl = await screen.findByText('No news/articles avaliable')
    expect(messageEl).toBeInTheDocument()
  })
})

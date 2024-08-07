import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthorForm } from './author-form'
import { authorsKey } from '@/services/storage/keys'
import { StorageUserAuthors } from '@/services/storage/types'

describe('Author Form', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear()
  })

  test('renders the form correctly', () => {
    render(<AuthorForm />)
    expect(screen.getByPlaceholderText('Add your authors')).toBeInTheDocument()
    expect(
      screen.getByText('Edit your article preferences'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('All your preferences will be saved locally'),
    ).toBeInTheDocument()
  })

  test('adds a new author', async () => {
    render(<AuthorForm />)
    const input = screen.getByPlaceholderText('Add your authors')
    const addButton = screen.getByTestId('add-author')

    fireEvent.change(input, { target: { value: 'J.K. Rowling' } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('J.K. Rowling')).toBeInTheDocument()
    })

    // Verifica se o autor foi salvo no localStorage
    const storageAuthors: StorageUserAuthors = JSON.parse(
      localStorage.getItem(authorsKey) || '{}',
    )
    expect(storageAuthors.authors).toContain('J.K. Rowling')
  })

  test('shows validation error when author name is too short', async () => {
    render(<AuthorForm />)
    const input = screen.getByPlaceholderText('Add your authors')
    const addButton = screen.getByTestId('add-author')

    fireEvent.change(input, { target: { value: 'Jo' } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Author name is too short')).toBeInTheDocument()
    })
  })

  test('deletes an author', async () => {
    // Primeiro, adicione um autor
    localStorage.setItem(
      authorsKey,
      JSON.stringify({ authors: ['J.K. Rowling'] }),
    )

    render(<AuthorForm />)

    await waitFor(() => {
      expect(screen.getByText('J.K. Rowling')).toBeInTheDocument()
    })

    const deleteButton = screen.getByTestId('author-badger')
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryByText('J.K. Rowling')).not.toBeInTheDocument()
    })

    // Verifica se o autor foi removido do localStorage
    const storageAuthors: StorageUserAuthors = JSON.parse(
      localStorage.getItem(authorsKey) || '{}',
    )
    expect(storageAuthors.authors).not.toContain('J.K. Rowling')
  })
})

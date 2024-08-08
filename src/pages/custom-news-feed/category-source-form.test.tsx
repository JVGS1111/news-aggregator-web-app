import { render, screen, waitFor } from '@testing-library/react'
import { CategorySourceForm } from './category-source-form'
import { preferencesKey } from '@/services/storage/keys'
import userEvent from '@testing-library/user-event'

describe('CategorySourceForm', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders correctly', () => {
    render(<CategorySourceForm />)

    expect(screen.getByText('Preferences:')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Sources')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('loads preferences from localStorage', () => {
    const mockPreferences = {
      categories: ['world', 'sports'],
      sources: ['the_guardian'],
    }
    window.localStorage.setItem(preferencesKey, JSON.stringify(mockPreferences))

    render(<CategorySourceForm />)

    // checking if the preferences were load
    expect(screen.getByLabelText('World')).toBeChecked()
    expect(screen.getByLabelText('Sports')).toBeChecked()
    expect(screen.getByLabelText('The Guardian')).toBeChecked()

    expect(screen.getByLabelText('The New York Times')).not.toBeChecked()
  })

  it('saves preferences to localStorage', async () => {
    await userEvent.setup()
    render(<CategorySourceForm />)

    // selecting sources and categories
    await userEvent.click(screen.getByLabelText('World'))
    await userEvent.click(screen.getByLabelText('The Guardian'))

    // click on the save button
    await userEvent.click(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      // check if the preferences are saved
      const savedPreferences = JSON.parse(
        window.localStorage.getItem(preferencesKey) || '{}',
      )
      expect(savedPreferences).toEqual({
        categories: ['world'],
        sources: ['the_guardian'],
      })
    })
  })

  it('does not save preferences if the form is not dirty', () => {
    render(<CategorySourceForm />)

    // it check if the save button is disabled by default
    const saveButton = screen.getByRole('button', { name: /save/i })
    expect(saveButton).toBeDisabled()
  })
})

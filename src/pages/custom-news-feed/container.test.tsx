import { render, screen, fireEvent } from '@testing-library/react'
import { Container } from './container'

// These are the mocked component of the tabs
jest.mock('./news-feed-controller', () => ({
  NewsFeedController: () => <div>Mocked NewsFeedController</div>,
}))

jest.mock('./preferences', () => ({
  Preferences: () => <div>Mocked Preferences</div>,
}))

describe('Container', () => {
  it('renders News Feed tab by default', () => {
    render(<Container />)

    // check if the NewsFeedController was rendered
    expect(screen.getByText('Mocked NewsFeedController')).toBeInTheDocument()
  })

  it('renders Preferences tab when clicked', () => {
    render(<Container />)

    // simulates the click on the "Preferences" tab
    fireEvent.click(screen.getByText('Preferences'))

    // check if the "Preferences" component was rendered
    expect(screen.getByText('Mocked Preferences')).toBeInTheDocument()
  })

  it('changes tab and renders the correct content', () => {
    render(<Container />)

    // check if the "News Feed" tab is rendered by default
    expect(screen.getByText('Mocked NewsFeedController')).toBeInTheDocument()

    // simulates the click on the "Preferences" tab
    fireEvent.click(screen.getByText('Preferences'))

    // check if the "Preferences" component was rendered
    expect(screen.getByText('Mocked Preferences')).toBeInTheDocument()

    // simulates clicking back to the "News Feed" tab
    fireEvent.click(screen.getByText('News Feed'))

    // check if the "News Feed" tab has been re-rendered
    expect(screen.getByText('Mocked NewsFeedController')).toBeInTheDocument()
  })
})

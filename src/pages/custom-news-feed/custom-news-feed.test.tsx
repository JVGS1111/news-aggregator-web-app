import { render, screen } from '@testing-library/react'
import CustomNewsFeed from './index.page'

// These are the mocked component
jest.mock('../../components/header', () => ({
  Header: () => <div>Mocked Header</div>,
}))

jest.mock('./container', () => ({
  Container: () => <div>Mocked Container</div>,
}))

describe('Custom News Feed', () => {
  it('Should renders correctly', () => {
    render(<CustomNewsFeed />)

    expect(screen.getByText('Mocked Header')).toBeInTheDocument()
    expect(screen.getByText('Mocked Container')).toBeInTheDocument()
  })
})

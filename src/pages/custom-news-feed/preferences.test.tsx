import { render, screen } from '@testing-library/react'
import { Preferences } from './preferences'

describe('Preferences', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })
  it('should renders correctly', () => {
    render(<Preferences />)
    const authorForm = screen.getByText('Edit your article preferences')
    const preferencesForm = screen.getByText('Preferences:')
    expect(authorForm).toBeInTheDocument()
    expect(preferencesForm).toBeInTheDocument()
  })
})

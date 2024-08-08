import { render, screen } from '@testing-library/react'
import { HeaderNav } from './header-nav'

describe('Header Nav Component', () => {
  it('should renders correctly', () => {
    render(<HeaderNav />)

    const firstNavItem = screen.getByText('Home')
    const secondNavItem = screen.getByText('News feed')
    expect(firstNavItem).toBeInTheDocument()
    expect(secondNavItem).toBeInTheDocument()
  })
})

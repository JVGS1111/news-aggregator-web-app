import { render, screen } from '@testing-library/react'
import { EmptyListMessage } from '.'

describe('Empty list Component', () => {
  it('should renders the message prop correctly', () => {
    const testMsg = 'Test message'
    render(<EmptyListMessage text={testMsg} />)

    const mesasgeElement = screen.getByText(testMsg)
    expect(mesasgeElement).toBeInTheDocument()
  })
})

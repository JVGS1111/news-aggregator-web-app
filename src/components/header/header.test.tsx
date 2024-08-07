import { render } from '@testing-library/react'
import { Header } from '.'
import { userEvent } from '@testing-library/user-event'

describe('Header', () => {
  it('Should renders correctly', () => {
    const component = render(<Header />)
    const header = component.getByTestId('header')
    expect(header).toBeInTheDocument()
  })
  it('Should open the search dialog', async () => {
    const component = render(<Header />)
    const button = component.getByTestId('dialog-button')
    expect(button).toBeInTheDocument()
    await userEvent.click(button)
    const dialog = await component.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })
})

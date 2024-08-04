import { render, screen } from '@testing-library/react'
import { Paginator } from '.'
import { userEvent } from '@testing-library/user-event'

let handleNextMock = jest.fn()
let handlePreviousMock = jest.fn()
describe('Paginator component', () => {
  beforeEach(() => {
    handlePreviousMock = jest.fn() // resting mocks
    handleNextMock = jest.fn()
  })

  it('should be able to render', () => {
    render(
      <Paginator
        handleNext={handleNextMock}
        handlePrevious={handlePreviousMock}
        nextAvaliable={true}
        previousAvaliable={true}
      />,
    )

    const paginator = screen.getByTestId('paginator')
    expect(paginator).toBeInTheDocument()
  })
  it('should be able to call for the next page', async () => {
    const user = userEvent.setup()
    render(
      <Paginator
        handleNext={handleNextMock}
        handlePrevious={handlePreviousMock}
        nextAvaliable={true}
        previousAvaliable={true}
      />,
    )

    const nextPageButton = screen.getByRole('button', {
      name: 'Next',
    })
    expect(nextPageButton).toBeInTheDocument()

    await user.click(nextPageButton)

    expect(handleNextMock).toHaveBeenCalledTimes(1)
  })
  it('should be able to call for the previous page', async () => {
    const user = userEvent.setup()
    render(
      <Paginator
        handleNext={handleNextMock}
        handlePrevious={handlePreviousMock}
        nextAvaliable={true}
        previousAvaliable={true}
      />,
    )

    const previousPageButton = screen.getByRole('button', {
      name: 'Previous',
    })
    expect(previousPageButton).toBeInTheDocument()

    await user.click(previousPageButton)

    expect(handlePreviousMock).toHaveBeenCalledTimes(1)
  })

  it('should NOT be able to call for the previous page if the button is disabled', async () => {
    const user = userEvent.setup()
    render(
      <Paginator
        handleNext={handleNextMock}
        handlePrevious={handlePreviousMock}
        nextAvaliable={false}
        previousAvaliable={false}
      />,
    )

    const previousPageButton = screen.getByRole('button', {
      name: 'Previous',
    })
    expect(previousPageButton).toBeInTheDocument()

    await user.click(previousPageButton)

    expect(handlePreviousMock).not.toHaveBeenCalled()
  })

  it('should NOT be able to call for the next page if the button is disabled', async () => {
    const user = userEvent.setup()
    render(
      <Paginator
        handleNext={handleNextMock}
        handlePrevious={handlePreviousMock}
        nextAvaliable={false}
        previousAvaliable={false}
      />,
    )

    const nextPageButton = screen.getByRole('button', {
      name: 'Next',
    })
    expect(nextPageButton).toBeInTheDocument()

    await user.click(nextPageButton)

    expect(handleNextMock).not.toHaveBeenCalled()
  })
})

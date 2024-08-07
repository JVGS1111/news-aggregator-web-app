import { userEvent } from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { TabNavigator } from '.'

const options = ['test 1', 'test 2']
const mock = jest.fn()
describe('TabNavigator', () => {
  it('Should display its tabs', () => {
    const component = render(
      <TabNavigator
        options={options}
        onChange={mock}
        defaultValue={options[0]}
      />,
    )

    const firstTab = component.getByRole('button', {
      name: options[0],
    })
    const secondTab = component.getByRole('button', {
      name: options[1],
    })
    expect(firstTab).toBeInTheDocument()
    expect(secondTab).toBeInTheDocument()
  })
  it('Should return the tab if it was click', async () => {
    const component = render(
      <TabNavigator
        options={options}
        onChange={mock}
        defaultValue={options[0]}
      />,
    )
    const secondTab = component.getByRole('button', {
      name: options[1],
    })
    await userEvent.click(secondTab)
    expect(mock).toHaveBeenCalledWith(options[1])
  })
  it('Should check the correct tab with the initial prop defaultValue', async () => {
    const component = render(
      <TabNavigator
        options={options}
        onChange={mock}
        defaultValue={options[1]}
      />,
    )
    const secondTab = component.getByRole('button', {
      name: options[1],
    })
    expect(secondTab).toHaveAttribute('data-ui', 'checked')
  })
})

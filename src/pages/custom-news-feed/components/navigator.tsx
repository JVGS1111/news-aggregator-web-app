import { useState } from 'react'

interface NavigatorProps {
  onChange: (valeu: string) => void
  options: string[]
  defaultValue?: string
}

export function Navigator({
  onChange,
  options,
  defaultValue = '',
}: NavigatorProps) {
  const [checked, setCheked] = useState(defaultValue)

  function renderButton(_options: string[]) {
    if (!_options || _options.length === 0) {
      return null
    }

    return _options.map((item) => {
      return (
        <button
          onClick={() => {
            handleChangePage(item)
          }}
          key={item}
          data-ui={item === checked ? 'checked' : ''}
          className="relative flex h-full items-center justify-center px-3 data-checked:after:absolute data-checked:after:bottom-0 data-checked:after:h-0.5 data-checked:after:w-full data-checked:after:bg-slate-800"
        >
          {item}
        </button>
      )
    })
  }

  function handleChangePage(value: string) {
    setCheked(value)
    onChange(value)
  }

  return (
    <div className="flex h-10 w-full flex-row items-center border-b-half border-slate-400">
      {renderButton(options)}
    </div>
  )
}

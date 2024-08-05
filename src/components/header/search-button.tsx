import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

interface SearchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        className="delay-50 flex h-8 w-8 items-center justify-start gap-2.5 rounded-lg border-half border-slate-400 px-2 text-slate-400 transition hover:bg-slate-600 xs:w-72"
        {...props}
      >
        <MagnifyingGlass
          size={24}
          weight="regular"
          className="text-slate-400"
        />{' '}
        <span className="hidden xs:block">Search</span>
      </button>
    )
  },
)

SearchButton.displayName = 'SearchButton'

export default SearchButton

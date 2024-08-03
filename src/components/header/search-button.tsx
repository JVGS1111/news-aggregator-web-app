import { MagnifyingGlass } from 'phosphor-react'

export function SearchButton() {
  return (
    <button className="delay-50 flex h-8 w-72 items-center justify-start gap-2.5 rounded-lg border-half border-slate-400 px-2  text-slate-400 transition hover:bg-slate-600">
      <MagnifyingGlass size={24} weight="regular" className="text-slate-400" />{' '}
      Search
    </button>
  )
}

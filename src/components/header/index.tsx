import Image from 'next/image'
import { HeaderNav } from './nav'
import { SearchButton } from './search-button'
import Logo from '@/assets/Logo.svg'

export function Header() {
  return (
    <header className="flex h-16 w-full justify-between bg-header px-6 py-4">
      <div className="flex flex-row items-center gap-2">
        <Image alt="News Agreggator" src={Logo} />
        <div className="h-full w-[1px] bg-white "></div>
        <HeaderNav />
      </div>
      <div>
        <SearchButton />
      </div>
    </header>
  )
}

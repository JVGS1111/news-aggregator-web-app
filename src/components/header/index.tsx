import Image from 'next/image'
import { HeaderNav } from './nav'
import SearchButton from './search-button'
import Logo from '@/assets/Logo.svg'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ModalSearch } from './modal-search'

export function Header() {
  return (
    <header
      className="flex h-16 w-full justify-between bg-header px-6 py-4"
      data-testid="header"
    >
      <div className="flex flex-row items-center gap-2">
        <Image alt="News Agreggator" src={Logo} />
        <div className="h-full w-[1px] bg-white "></div>
        <HeaderNav />
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <SearchButton data-testid="dialog-button" />
          </DialogTrigger>
          <ModalSearch />
        </Dialog>
      </div>
    </header>
  )
}

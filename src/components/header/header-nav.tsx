import Link from 'next/link'

export function HeaderNav() {
  return (
    <nav className="text-md flex h-8 items-center text-sm font-medium text-white">
      <ul className="flex h-8 items-center gap-2 ">
        <li className="relative flex h-full items-center after:absolute after:bottom-0 after:left-0 after:hidden after:h-[1px] after:w-full after:bg-white hover:after:block">
          <Link href={'/'}>Home</Link>
        </li>
        <li className="relative flex h-full items-center after:absolute after:bottom-0 after:left-0 after:hidden after:h-[1px] after:w-full after:bg-white hover:after:block">
          <Link href={'/custom-news-feed'}>News feed</Link>
        </li>
      </ul>
    </nav>
  )
}

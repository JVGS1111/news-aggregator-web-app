import Link from 'next/link'

export function HeaderNav() {
  return (
    <nav className="text-md flex h-8 items-center text-sm font-medium text-white">
      <div className="flex h-8 items-center gap-2 ">
        <Link href={'/'}>
          <span className="relative h-full after:absolute after:bottom-0 after:left-0 after:hidden after:h-[1px] after:w-full after:bg-white hover:after:block">
            Home
          </span>
        </Link>
        <Link href={'/custom-news-feed'}>
          <span className="relative h-full after:absolute after:bottom-0 after:left-0 after:hidden after:h-[1px] after:w-full after:bg-white hover:after:block">
            News feed
          </span>
        </Link>
      </div>
    </nav>
  )
}

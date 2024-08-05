import { MagnifyingGlass, SlidersHorizontal } from 'phosphor-react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { DatePicker } from './date-input'
import { SelectCategory } from './select-category'
import { SelectSource } from './select-source'
import { NewsList } from '@/pages/home/components/news-list'

export function ModalSearch() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center text-xl font-medium text-title">
          Search for your article
        </DialogTitle>
      </DialogHeader>
      <form className="border-b-[1px] border-slate-500 pb-3">
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full gap-3">
            <Input type="text" placeholder="Search" alt="Search input" />
            <button
              type="button"
              className="flex aspect-square h-9 items-center justify-center rounded-md bg-slate-700 hover:bg-slate-600"
            >
              <MagnifyingGlass
                weight="regular"
                className="h-5 w-5 text-slate-50"
              />
            </button>
            <button
              type="button"
              className="flex aspect-square h-9 items-center justify-center rounded-md bg-slate-700 hover:bg-slate-600"
            >
              <SlidersHorizontal
                weight="regular"
                className="h-5 w-5 text-slate-50"
              />
            </button>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3 xs:flex-row xs:justify-start">
            <DatePicker />
            <SelectCategory />
            <SelectSource />
          </div>
        </div>
      </form>
      <ul className="max-h-[400px] overflow-auto">
        <NewsList
          articles={[
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
            {
              author: 'test',
              published_at: new Date().toISOString(),
              source: 'TESTE',
              title: 'test',
              url: 'https://translate.google.com/?sl=pt&tl=en&op=translate',
            },
          ]}
        />
      </ul>
    </DialogContent>
  )
}

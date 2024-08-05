import { MagnifyingGlass, SlidersHorizontal } from 'phosphor-react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { DatePicker } from './date-input'
import { SelectCategory } from './select-category'

export function ModalSearch() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center text-xl font-medium text-title">
          Search for your article
        </DialogTitle>
      </DialogHeader>
      <form>
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
          <div className="flex w-full gap-3">
            <DatePicker />
            <SelectCategory />
          </div>
        </div>
      </form>
    </DialogContent>
  )
}

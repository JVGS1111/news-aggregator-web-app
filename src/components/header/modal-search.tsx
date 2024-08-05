import { MagnifyingGlass, SlidersHorizontal, X } from 'phosphor-react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { DatePicker } from './date-input'
import { SelectCategory } from './select-category'
import { SelectSource } from './select-source'
import { NewsList } from '@/pages/home/components/news-list'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const searchArticlesFormSchema = z.object({
  keyword: z.string({ required_error: 'Field required' }).min(3),
  source: z.string().optional(),
  category: z.string().optional(),
  date: z.date().optional(),
})
type SearchArticlesForm = z.infer<typeof searchArticlesFormSchema>

export function ModalSearch() {
  const [showFilters, setShowFilter] = useState(false)
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<SearchArticlesForm>({
    resolver: zodResolver(searchArticlesFormSchema),
    defaultValues: {
      category: '',
      date: undefined,
      keyword: '',
      source: '',
    },
  })

  async function handleSearch(formData: SearchArticlesForm) {
    console.log(formData)
  }

  function resetForm() {
    reset({
      category: '',
      date: undefined,
      keyword: '',
      source: '',
    })
  }

  function renderFilters() {
    if (showFilters) {
      return (
        <div className="flex w-full flex-col items-center justify-center gap-3 xs:flex-row xs:justify-start">
          <DatePicker control={control} name="date" />
          <SelectCategory control={control} name="category" />
          <SelectSource control={control} name="source" />
        </div>
      )
    }
    return null
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center text-xl font-medium text-title">
          Search for your article
        </DialogTitle>
      </DialogHeader>
      <form
        className="border-b-[1px] border-slate-500 pb-3"
        onSubmit={handleSubmit(handleSearch)}
      >
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full gap-3">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search"
                alt="Search input"
                {...register('keyword')}
              />
              {isDirty && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="absolute right-0 top-0 flex aspect-square h-9 items-center justify-center  text-blue-600"
                >
                  <X className="h-5 w-5 " />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="flex aspect-square h-9 items-center justify-center rounded-md bg-slate-700 hover:bg-slate-600"
            >
              <MagnifyingGlass
                weight="regular"
                className="h-5 w-5 text-slate-50"
              />
            </button>
            <button
              onClick={() => {
                setShowFilter(!showFilters)
              }}
              type="button"
              className="flex aspect-square h-9 items-center justify-center rounded-md bg-slate-700 hover:bg-slate-600"
            >
              <SlidersHorizontal
                weight="regular"
                className="h-5 w-5 text-slate-50"
              />
            </button>
          </div>
          {renderFilters()}
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
          ]}
        />
      </ul>
    </DialogContent>
  )
}

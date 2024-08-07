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
import { Article } from '@/@types/news-types'
import { getNewsWithFilter } from '@/services/web/news'
import { EmptyListMessage } from '../empty-list'

const searchArticlesFormSchema = z.object({
  keyword: z
    .string({ required_error: 'Field required' })
    .min(3, { message: 'The text is too short' }),
  source: z.string().optional(),
  category: z.string().optional(),
  date: z.date().optional(),
})
type SearchArticlesForm = z.infer<typeof searchArticlesFormSchema>

export function ModalSearch() {
  const [articles, setArticles] = useState<Article[]>([])
  const [showFilters, setShowFilter] = useState(false)
  const [showEmptyListMessage, setShowEmptyListMessage] = useState(false)
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
    if (showEmptyListMessage) setShowEmptyListMessage(false)
    try {
      const { data } = await getNewsWithFilter(formData)
      setArticles(data.articles)
      if (data.articles.length === 0) {
        setShowEmptyListMessage(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function resetForm() {
    reset({
      category: '',
      date: undefined,
      keyword: '',
      source: '',
    })
    setShowEmptyListMessage(false)
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

  function renderEmptyListMessage() {
    if (showEmptyListMessage) {
      return <EmptyListMessage text="No news/articles avaliable" />
    }

    return null
  }

  return (
    <DialogContent aria-describedby="search article dialog">
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
              <div className="flex w-full flex-col">
                <Input
                  type="text"
                  placeholder="Search"
                  alt="Search input"
                  {...register('keyword')}
                />
                {errors.keyword && (
                  <span className="text-sm text-red-600">
                    {errors.keyword.message}
                  </span>
                )}
              </div>

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
              className="flex aspect-square h-9 items-center justify-center rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
              disabled={isSubmitting}
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
      {renderEmptyListMessage()}
      <ul className="max-h-[400px] overflow-auto">
        <NewsList articles={articles} />
      </ul>
    </DialogContent>
  )
}

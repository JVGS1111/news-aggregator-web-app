import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const authorsFormSchema = z.object({
  author: z.string().min(3, { message: 'Author name is too short' }),
})

interface Authors {
  authors: string[]
}
type AuthorForm = z.infer<typeof authorsFormSchema>
export function AuthorForm() {
  const [authors, setAuthors] = useState<string[]>([])
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorForm>({
    resolver: zodResolver(authorsFormSchema),
  })

  useEffect(() => {
    getInitialStates()
  }, [])

  function getInitialStates() {
    // getting preferences from localstorage and setting in the form

    const storageAuthors: Authors = getStorage()
    if (storageAuthors && storageAuthors.authors) {
      setAuthors(storageAuthors.authors)
    }
  }

  function getStorage() {
    const json = localStorage.getItem('@NEWS_AGREGGATOR:AUTHORS')
    if (!json) {
      return false
    }

    const authors = JSON.parse(json)

    return authors
  }

  function handleSaveAuthor(author: AuthorForm) {
    // saving preferences on localstorage
    if (authors.includes(author.author)) {
      return
    }
    const storage = getStorage()
    const newAuthors: Authors = {
      authors: [author.author],
    }
    if (storage) {
      newAuthors.authors.push(...storage.authors)
    }

    reset({ author: undefined }, { keepDirty: false })
    storageAuthors(newAuthors)
    addNewAuthorToState(author.author)
  }

  function storageAuthors(value: Authors) {
    localStorage.setItem('@NEWS_AGREGGATOR:AUTHORS', JSON.stringify(value))
  }

  function addNewAuthorToState(author: string) {
    const newArr = new Array(...authors)
    newArr.push(author)
    setAuthors(newArr)
  }

  function handleDeleteAuthor(author: string) {
    const newAuthors: Authors = {
      authors: [],
    }
    const filteredAuthors = authors.filter((auth) => auth !== author)

    newAuthors.authors.push(...filteredAuthors)
    storageAuthors(newAuthors)
    setAuthors(filteredAuthors)
  }
  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit(handleSaveAuthor)}
    >
      <div className="flex w-full flex-col">
        <h1 className="text-lg font-medium text-title">
          Edit your article preferences
        </h1>
        <p className="text-xs font-normal text-subtitle">
          All your preferences will be saved locally
        </p>
      </div>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 font-medium text-title">Authors</legend>
        <div className="flex flex-row gap-4">
          <Input
            type="text"
            placeholder="Add your authors"
            className="max-w-[250px]"
            {...register('author')}
          />
          <button
            type="submit"
            className="flex aspect-square h-9 items-center justify-center rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
          >
            <Plus weight="regular" className="h-5 w-5 text-slate-50" />
          </button>
        </div>
        {errors.author && (
          <span className="text-sm text-red-600">{errors.author.message}</span>
        )}
        <div className="flex flex-row flex-wrap gap-3">
          {authors.map((aut) => (
            <button
              key={aut}
              className="flex items-center justify-center gap-2 truncate rounded-full border border-slate-700 px-2.5 py-1 text-sm"
              type="button"
              onClick={() => {
                handleDeleteAuthor(aut)
              }}
            >
              {aut}
              <X />
            </button>
          ))}
        </div>
      </fieldset>
    </form>
  )
}
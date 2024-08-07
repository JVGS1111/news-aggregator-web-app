'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { preferencesKey } from '@/services/storage/keys'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

interface CheckboxItem {
  id: string
  label: string
}

const categories: CheckboxItem[] = [
  { id: 'world', label: 'World' },
  { id: 'sports', label: 'Sports' },
  { id: 'arts', label: 'Arts' },
  { id: 'books', label: 'Books' },
  { id: 'business', label: 'Business' },
  { id: 'education', label: 'Education' },
  { id: 'food', label: 'Food' },
  { id: 'health', label: 'Health' },
  { id: 'movies', label: 'Movies' },
  { id: 'music', label: 'Music' },
  { id: 'style', label: 'Style' },
  { id: 'culture', label: 'Culture' },
  { id: 'technology', label: 'Technology' },
]

const sources: CheckboxItem[] = [
  { id: 'the_new_york_times', label: 'The New York Times' },
  { id: 'the_guardian', label: 'The Guardian' },
  { id: 'open_news', label: 'Open News' },
]

const preferencesFormSchema = z.object({
  categories: z.array(z.string()),
  sources: z.array(z.string()),
})

type PreferencesForm = z.infer<typeof preferencesFormSchema>

export function CategorySourceForm() {
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      categories: [],
      sources: [],
    },
  })

  useEffect(() => {
    getInitialStates()
  }, [])

  function getInitialStates() {
    // getting preferences from localstorage and setting in the form
    if (typeof window === 'undefined') {
      return
    }
    const json = window.localStorage.getItem(preferencesKey)
    if (!json) {
      return
    }
    const preferences: PreferencesForm = JSON.parse(json)
    if (preferences.categories && preferences.sources) {
      reset(preferences)
    }
  }

  function handleSavePreferences(pref: PreferencesForm) {
    // saving preferences on localstorage
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem(preferencesKey, JSON.stringify(pref))
    reset(pref, { keepDirty: false })
  }

  // this form is ugly, I know and... I hope I have time to work on it
  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit(handleSavePreferences)}
    >
      <h1 className="text-lg font-medium text-title">Preferences:</h1>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 font-medium text-title">Categories</legend>
        <div className="flex flex-col gap-3">
          {categories.map((category) => {
            return (
              <Controller
                key={category.id}
                control={control}
                name="categories"
                render={({ field }) => (
                  <label className="items-cente flex flex-row gap-2">
                    <Checkbox
                      checked={field.value?.includes(category.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange(
                              abstractArray(field.value, category.id),
                            )
                          : field.onChange(
                              field.value?.filter(
                                (value) => value !== category.id,
                              ),
                            )
                      }}
                    />
                    {category.label}
                  </label>
                )}
              />
            )
          })}
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 items-center font-medium text-title">
          Sources
        </legend>
        <div className="flex flex-col gap-3">
          {sources.map((source) => {
            return (
              <Controller
                key={source.id}
                control={control}
                name="sources"
                render={({ field }) => (
                  <label className="flex flex-row items-center gap-2">
                    <Checkbox
                      checked={field.value?.includes(source.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange(
                              abstractArray(field.value, source.id),
                            )
                          : field.onChange(
                              field.value?.filter(
                                (value) => value !== source.id,
                              ),
                            )
                      }}
                    />
                    {source.label}
                  </label>
                )}
              />
            )
          })}
        </div>
      </fieldset>
      <Button className="max-w-28" disabled={!isDirty}>
        Save
      </Button>
    </form>
  )
}

function abstractArray(array: string[], newValue: string) {
  const newArr = [...array, newValue]

  return newArr
}

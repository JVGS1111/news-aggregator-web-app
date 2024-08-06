import { AuthorForm } from './author-form'
import { CategorySourceForm } from './category-source-form'

export function Preferences() {
  return (
    <div className="mb-4 flex w-full flex-col gap-3 py-4">
      <AuthorForm />
      <CategorySourceForm />
    </div>
  )
}

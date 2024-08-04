export type Article = {
  number?: number
  title: string | null
  author: string | null
  published_at: string | null
  source: string | null
  url: string | null
}

export interface NewsFormated {
  articles: Article[]
}

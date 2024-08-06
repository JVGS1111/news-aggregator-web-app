interface Multimedia {
  url: string
  format: string
  height: number
  width: number
  type: string
  subtype: string
  caption: string
  copyright: string
}

interface Result {
  section: string
  subsection: string
  title: string
  abstract: string
  url: string
  uri: string
  byline: string
  item_type: string
  updated_date: string
  created_date: string
  published_date: string
  material_type_facet: string
  kicker: string
  des_facet: string[]
  org_facet: string[]
  per_facet: string[]
  geo_facet: string[]
  multimedia: Multimedia[]
  short_url: string
}

export interface TheNewYorkTimesApiResponse {
  status: string
  copyright: string
  section: string
  last_updated: string
  num_results: number
  results: Result[]
}

export interface GetNewsFromTNYTApiResponse {
  response: {
    docs: {
      abstract: string
      web_url: string
      snippet: string
      lead_paragraph: string
      print_section: string
      print_page: string
      source: string
      pub_date: string
      document_type: string
      new_desk: string
      section_name: string
      byline: {
        original: string
      }
    }[]
  }
}

export interface thirdPartyType {
  author?: string
  category?: string
  content: string
  origin?: string
  key?: string
  language?: string
  unit?: string
  location: {
    name: string
  }
  now: {
    text?: string
    temperature?: string
  }

  results: thirdPartyType[]
}

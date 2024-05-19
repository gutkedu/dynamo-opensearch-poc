export interface QueryBooksSearchParams {
  name: string | null
  author: string | null
  description: string | null
}

export interface OpenSearchResponse<T> {
  took: number
  timed_out: boolean
  _shards: {
    total: number
    successful: number
    skipped: number
    failed: number
  }
  hits: {
    total: {
      value: number
      relation: string
    }
    max_score: number
    hits: {
      _index: string
      _id: string
      _score: number
      _source: T
    }[]
  }
}

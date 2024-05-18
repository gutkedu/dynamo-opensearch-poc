import { SearchEngineProvider } from '@/providers/search-engine/search-engine-provider'

interface FetchBooksRequest {
  name: string | null
  author: string | null
  description: string | null
}

interface FetchBooksResponse {
  books: any
}

export class FetchBooksUseCase {
  constructor(private readonly searchEngineProvider: SearchEngineProvider) {}

  async execute({ author, description, name }: FetchBooksRequest): Promise<FetchBooksResponse> {
    const response = await this.searchEngineProvider.queryBooks({
      author,
      description,
      name
    })

    return {
      books: response
    }
  }
}

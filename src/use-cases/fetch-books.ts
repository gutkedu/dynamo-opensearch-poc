import { SearchEngineProvider } from '@/providers/search-engine/search-engine-provider'

interface FetchBooksRequest {
  name: string | null
  author: string | null
  description: string | null
}

interface FetchBooksResponse {
  books: {
    id: string
    libraryId: string
    name: string
    author: string
    description: string
  }[]
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
      books: response.map((b) => ({
        id: b.id,
        libraryId: b.libraryId,
        name: b.name,
        author: b.author,
        description: b.description
      }))
    }
  }
}

import { BookEntity } from '@/core/book'
import { SearchEngineProvider } from '@/providers/search-engine/search-engine-provider'

interface SaveBookRequest {
  book: BookEntity
}

export class SaveBookUseCase {
  constructor(private readonly searchEngineProvider: SearchEngineProvider) {}

  async execute(request: SaveBookRequest): Promise<void> {
    await this.searchEngineProvider.saveNewBook(request.book)
  }
}

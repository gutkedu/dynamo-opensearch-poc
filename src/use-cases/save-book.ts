import { BookProps } from '@/core/book'
import { SearchEngineProvider } from '@/providers/search-engine/search-engine-provider'

interface SaveBookRequest {
  bookProps: BookProps
}

export class SaveBookUseCase {
  constructor(private readonly searchEngineProvider: SearchEngineProvider) {}

  async execute({ bookProps }: SaveBookRequest): Promise<void> {
    await this.searchEngineProvider.saveNewBook(bookProps)
  }
}

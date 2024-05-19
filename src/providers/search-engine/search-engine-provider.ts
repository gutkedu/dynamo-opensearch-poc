import { BookEntity, BookProps } from '@/core/book'
import { QueryBooksSearchParams } from './dtos/opensearch-provider-dtos'

export interface SearchEngineProvider {
  saveNewBook(data: BookProps): Promise<void>
  queryBooks(payload: QueryBooksSearchParams): Promise<BookEntity[]>
}

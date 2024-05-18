import { BookEntity } from '@/core/book'
import { QueryBooksSearchParams } from './dtos/opensearch-provider-dtos'

export interface SearchEngineProvider {
  saveNewBook(data: BookEntity): Promise<void>
  queryBooks(payload: QueryBooksSearchParams): Promise<any>
}

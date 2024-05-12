import { DynamoBookRepository } from '@/repositories/dynamodb/dynamo-book-repository'
import { DynamoLibraryRepository } from '@/repositories/dynamodb/dynamo-library-repository'
import { FetchLibraryBooksUseCase } from '../fetch-lib-books'

export function makeFetchLibBooksUseCase() {
  const bookRepo = new DynamoBookRepository()
  const libraryRepo = new DynamoLibraryRepository()
  return new FetchLibraryBooksUseCase(bookRepo, libraryRepo)
}

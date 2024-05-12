import { DynamoBookRepository } from '@/repositories/dynamodb/dynamo-book-repository'
import { DynamoLibraryRepository } from '@/repositories/dynamodb/dynamo-library-repository'
import { CreateBookUseCase } from '../create-book'

export function makeCreateBookUseCase() {
  const bookRepo = new DynamoBookRepository()
  const libraryRepo = new DynamoLibraryRepository()
  return new CreateBookUseCase(bookRepo, libraryRepo)
}

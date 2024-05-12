import { DynamoLibraryRepository } from '@/repositories/dynamodb/dynamo-library-repository'
import { FetchLibrariesUseCase } from '../fetch-libraries'

export function makeFetchLibraries() {
  const libraryRepository = new DynamoLibraryRepository()
  return new FetchLibrariesUseCase(libraryRepository)
}

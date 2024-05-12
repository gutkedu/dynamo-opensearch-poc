import { DynamoLibraryRepository } from '@/repositories/dynamodb/dynamo-library-repository'
import { RegisterLibraryUseCase } from '../register-library'

export function makeRegisterLibraryUseCase() {
  const libraryRepository = new DynamoLibraryRepository()
  return new RegisterLibraryUseCase(libraryRepository)
}

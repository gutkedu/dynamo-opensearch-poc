import { LibraryRepository } from '@/repositories/library-repository'

interface FetchLibrariesUseCaseResponse {
  libraries: {
    id: string
    name: string
    email: string
  }[]
}

export class FetchLibrariesUseCase {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async execute(): Promise<FetchLibrariesUseCaseResponse> {
    const libraries = await this.libraryRepository.findMany()

    return {
      libraries: libraries.map((library) => ({
        id: library.id,
        name: library.name,
        email: library.email
      }))
    }
  }
}

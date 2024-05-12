import { BookRepository } from '@/repositories/book-repository'
import { LibraryRepository } from '@/repositories/library-repository'
import { BusinessError } from '@/shared/business-error'

interface FetchLibraryBooksUseCaseRequest {
  libraryId: string
}

interface FetchLibraryBooksUseCaseResponse {
  books: {
    id: string
    libraryId: string
    name: string
    author: string
    description: string
  }[]
}

export class FetchLibraryBooksUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly libraryRepository: LibraryRepository
  ) {}

  async execute({ libraryId }: FetchLibraryBooksUseCaseRequest): Promise<FetchLibraryBooksUseCaseResponse> {
    const lib = await this.libraryRepository.findById(libraryId)

    if (!lib) {
      throw new BusinessError('Library not found')
    }

    const books = await this.bookRepository.findManyByLibraryId(libraryId)

    return {
      books: books.map((b) => ({
        id: b.id,
        libraryId: b.libraryId,
        name: b.name,
        author: b.author,
        description: b.description
      }))
    }
  }
}

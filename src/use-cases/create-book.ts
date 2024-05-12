import { BookEntity } from '@/core/book'
import { BookRepository } from '@/repositories/book-repository'
import { LibraryRepository } from '@/repositories/library-repository'
import { BusinessError } from '@/shared/business-error'

interface CreateBookRequest {
  libraryId: string
  name: string
  author: string
  description: string
}

interface CreateBookResponse {
  book: {
    id: string
    libraryId: string
    name: string
    author: string
    description: string
  }
}

export class CreateBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly libraryRepository: LibraryRepository
  ) {}

  async execute({ author, description, libraryId, name }: CreateBookRequest): Promise<CreateBookResponse> {
    const lib = await this.libraryRepository.findById(libraryId)

    if (!lib) {
      throw new BusinessError('Library not found')
    }

    const book = BookEntity.create({
      data: {
        author,
        description,
        libraryId,
        name
      }
    })

    await this.bookRepository.create(book)

    return {
      book: {
        id: book.id,
        libraryId: book.libraryId,
        name: book.name,
        author: book.author,
        description: book.description
      }
    }
  }
}

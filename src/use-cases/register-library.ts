import { LibraryEntity } from '@/core/library'
import { LibraryRepository } from '@/repositories/library-repository'

interface RegisterLibraryUseCaseRequest {
  name: string
  email: string
}

interface RegisterLibraryUseCaseResponse {
  library: {
    id: string
    name: string
    email: string
  }
}

export class RegisterLibraryUseCase {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async execute({ email, name }: RegisterLibraryUseCaseRequest): Promise<RegisterLibraryUseCaseResponse> {
    const library = LibraryEntity.create({
      data: {
        name,
        email
      }
    })

    await this.libraryRepository.create(library)

    return {
      library: {
        id: library.id,
        name: library.name,
        email: library.email
      }
    }
  }
}

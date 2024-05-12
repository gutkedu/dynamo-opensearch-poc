import { BookEntity } from '@/core/book'

export interface BookRepository {
  create(data: BookEntity): Promise<BookEntity>
  findManyByLibraryId(libraryId: string): Promise<BookEntity[]>
}

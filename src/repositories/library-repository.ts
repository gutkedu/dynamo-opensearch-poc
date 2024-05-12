import { LibraryEntity } from '@/core/library'

export interface LibraryRepository {
  create(data: LibraryEntity): Promise<LibraryEntity>
  findMany(): Promise<LibraryEntity[]>
  findById(libraryId: string): Promise<LibraryEntity | null>
}

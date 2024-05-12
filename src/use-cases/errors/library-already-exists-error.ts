export class LibraryAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists')
  }
}

import { FastifyInstance } from 'fastify'
import { registerLibraryController } from './register'
import { fetchLibrariesController } from './fetch'

export async function libraryRoutes(app: FastifyInstance) {
  app.post('/library', registerLibraryController)
  app.get('/library', fetchLibrariesController)
}

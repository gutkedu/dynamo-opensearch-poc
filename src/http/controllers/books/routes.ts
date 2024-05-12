import { FastifyInstance } from 'fastify'
import { createBookController } from './create'
import { fetchBooksController } from './fetch'

export async function bookRoutes(app: FastifyInstance) {
  app.post('/book', createBookController)
  app.get('/book', fetchBooksController)
}

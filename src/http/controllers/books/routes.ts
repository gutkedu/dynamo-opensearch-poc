import { FastifyInstance } from 'fastify'
import { createBookController } from './create'
import { fetchBooksController } from './fetch'
import { fetchAllBooksController } from './fetch-all'

export async function bookRoutes(app: FastifyInstance) {
  app.post('/book', createBookController)
  app.get('/book', fetchBooksController)
  app.get('/book/all', fetchAllBooksController)
}

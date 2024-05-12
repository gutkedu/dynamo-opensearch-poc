import Fastify from 'fastify'
import { libraryRoutes } from './http/controllers/libraries/routes'
import { ZodError } from 'zod'
import { IntegrationError } from './shared/integration-error'

export const app = Fastify()

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

app.register(libraryRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format()
    })
  }

  if (error instanceof IntegrationError) {
    return reply.status(400).send({ message: error.message })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Internal server error.' })
})

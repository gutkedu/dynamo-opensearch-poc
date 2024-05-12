import Fastify from 'fastify'

export const app = Fastify()

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

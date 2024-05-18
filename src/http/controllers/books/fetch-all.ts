import { makeFetchBooksUseCase } from '@/use-cases/factories/make-fetch-books'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function fetchAllBooksController(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional()
  })

  const { author, description, name } = schema.parse(request.query)

  try {
    const useCase = makeFetchBooksUseCase()

    const { books } = await useCase.execute({
      author: author ?? null,
      description: description ?? null,
      name: name ?? null
    })

    reply.status(200).send({
      books
    })
  } catch (err) {
    throw err
  }
}

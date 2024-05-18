import { validateKsuid } from '@/shared/validate-ksuid'
import { makeFetchLibBooksUseCase } from '@/use-cases/factories/make-fetch-lib-books'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function fetchBooksController(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    libraryId: z.string().refine(validateKsuid)
  })

  const { libraryId } = schema.parse(request.query)

  try {
    const useCase = makeFetchLibBooksUseCase()

    const { books } = await useCase.execute({
      libraryId
    })

    reply.status(200).send({
      books
    })
  } catch (err) {
    throw err
  }
}

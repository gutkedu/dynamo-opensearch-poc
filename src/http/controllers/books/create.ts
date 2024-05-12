import { validateKsuid } from '@/shared/validate-ksuid'
import { makeCreateBookUseCase } from '@/use-cases/factories/make-create-book'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createBookController(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string().min(3),
    author: z.string().min(3),
    description: z.string().min(3),
    libraryId: z.string().refine(validateKsuid)
  })

  const { author, description, libraryId, name } = schema.parse(request.body)

  try {
    const registerUseCase = makeCreateBookUseCase()

    const { book } = await registerUseCase.execute({
      author,
      description,
      libraryId,
      name
    })

    reply.status(201).send({
      book
    })
  } catch (err) {
    throw err
  }
}

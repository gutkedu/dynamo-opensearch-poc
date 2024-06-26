import { makeRegisterLibraryUseCase } from '@/use-cases/factories/make-register-library'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function registerLibraryController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email()
  })

  const { name, email } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterLibraryUseCase()

    const { library } = await registerUseCase.execute({
      name,
      email
    })

    reply.status(201).send({
      library
    })
  } catch (err) {
    throw err
  }
}

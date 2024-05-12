import { makeFetchLibraries } from '@/use-cases/factories/make-fetch-libraries'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function fetchLibrariesController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const useCase = makeFetchLibraries()

    const { libraries } = await useCase.execute()

    reply.status(200).send({
      libraries
    })
  } catch (err) {
    throw err
  }
}

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import awsLambdaFastify from '@fastify/aws-lambda'
import { app } from '@/app'

const proxy = awsLambdaFastify(app)

export async function apiHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  return await proxy(event, context)
}

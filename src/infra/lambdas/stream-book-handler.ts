import { BookEntity } from '@/core/book'
import { AttributeValue } from '@aws-sdk/client-dynamodb'
import { Context, DynamoDBStreamEvent } from 'aws-lambda'
import { makeSaveBookUseCase } from '@/use-cases/factories/make-save-book'

const useCase = makeSaveBookUseCase()

export async function streamBookHandler(event: DynamoDBStreamEvent, context: Context) {
  for (const record of event.Records) {
    const bookProps = BookEntity.fromDynamoToProps(record.dynamodb?.NewImage as Record<string, AttributeValue>)
    await useCase.execute({
      bookProps
    })
  }
  return `Successfully processed ${event.Records.length} records.`
}

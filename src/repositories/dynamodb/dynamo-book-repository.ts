import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { IntegrationError } from '@/shared/integration-error'
import { BookRepository } from '../book-repository'
import { BookEntity } from '@/core/book'

export class DynamoBookRepository implements BookRepository {
  private client: DynamoDBClient
  private tableName: string

  constructor() {
    this.client = new DynamoDBClient({ region: process.env.AWS_REGION })
    this.tableName = process.env.DYNAMO_TABLE as string
  }

  async create(data: BookEntity): Promise<BookEntity> {
    try {
      const command = new PutItemCommand({
        TableName: this.tableName,
        Item: data.toDynamoItem(),
        ConditionExpression: 'attribute_not_exists(SK)'
      })

      await this.client.send(command)

      return data
    } catch (error) {
      console.error(error)
      throw new IntegrationError('Error creating book')
    }
  }

  async findManyByLibraryId(libraryId: string): Promise<BookEntity[]> {
    try {
      const command = new QueryCommand({
        TableName: this.tableName,
        IndexName: 'LSI1',
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': { S: `LIBRARY#${libraryId}#BOOK` }
        }
      })

      const { Items } = await this.client.send(command)

      if (!Items) return []

      return Items.map((item) => BookEntity.fromDynamoItem(item))
    } catch (error) {
      console.error(error)
      throw new IntegrationError('Error fetching books')
    }
  }
}

import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { LibraryRepository } from '../library-repository'
import { LibraryEntity } from '@/core/library'
import { IntegrationError } from '@/shared/integration-error'

export class DynamoLibraryRepository implements LibraryRepository {
  private client: DynamoDBClient
  private tableName: string

  constructor() {
    this.client = new DynamoDBClient({ region: process.env.AWS_REGION })
    this.tableName = process.env.DYNAMO_TABLE as string
  }

  async create(data: LibraryEntity): Promise<LibraryEntity> {
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
      throw new IntegrationError('Error creating library')
    }
  }

  async findMany(): Promise<LibraryEntity[]> {
    try {
      const command = new QueryCommand({
        TableName: this.tableName,
        IndexName: 'LSI1',
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': { S: 'LIBRARY' }
        }
      })

      const { Items } = await this.client.send(command)

      if (!Items) return []

      return Items.map((item) => LibraryEntity.fromDynamoItem(item))
    } catch (error) {
      console.error(error)
      throw new IntegrationError('Error fetching libraries')
    }
  }

  async findById(libraryId: string): Promise<LibraryEntity | null> {
    try {
      const command = new GetItemCommand({
        TableName: this.tableName,
        Key: {
          PK: { S: 'LIBRARY' },
          SK: { S: `LIBRARY#${libraryId}` }
        }
      })

      const { Item } = await this.client.send(command)

      if (!Item) return null

      return LibraryEntity.fromDynamoItem(Item)
    } catch (error) {
      console.error(error)
      throw new IntegrationError('Error finding library')
    }
  }
}

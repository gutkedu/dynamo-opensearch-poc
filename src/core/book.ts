import { Item } from './item'
import { AttributeValue } from '@aws-sdk/client-dynamodb'
import KSUID from 'ksuid'

interface BookProps {
  data: {
    id?: string
    libraryId: string
    name: string
    author: string
    description: string
  }
  createdAt?: number
}

export class BookEntity extends Item<BookProps> {
  get pk(): string {
    return `LIBRARY#${this.props.data.libraryId}#BOOK`
  }

  get sk(): string {
    return `BOOK#${this.props.data.id}`
  }

  get rangeN1(): number {
    return this.createdAt
  }

  get id(): string {
    return this.props.data.id ?? KSUID.randomSync().string
  }

  get libraryId(): string {
    return this.props.data.libraryId
  }

  get name(): string {
    return this.props.data.name
  }

  get author(): string {
    return this.props.data.author
  }

  get createdAt(): number {
    return this.props.createdAt ?? Date.now()
  }

  get description(): string {
    return this.props.data.description
  }

  getDynamoKeys(): Record<string, AttributeValue> {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk },
      rangeN1: { N: this.rangeN1.toString() }
    }
  }

  toDynamoItem(): Record<string, AttributeValue> {
    return {
      ...this.getDynamoKeys(),
      data: { S: JSON.stringify(this.props.data) },
      createdAt: { N: this.createdAt.toString() ?? Date.now().toString() }
    }
  }

  static fromDynamoItem(item: Record<string, AttributeValue>): BookEntity {
    const { data, createdAt } = item

    return new BookEntity({
      data: JSON.parse(data.S ?? '{}'),
      createdAt: Number(createdAt.N) ?? Date.now()
    })
  }

  static create(props: BookProps): BookEntity {
    const Book = new BookEntity({
      data: {
        ...props.data,
        id: props.data.id ?? KSUID.randomSync().string
      },
      createdAt: Date.now()
    })
    return Book
  }
}

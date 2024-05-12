import { Item } from './item'
import { AttributeValue } from '@aws-sdk/client-dynamodb'
import KSUID from 'ksuid'

interface LibraryProps {
  data: {
    id?: string
    name: string
    email: string
  }
  createdAt?: number
}

export class LibraryEntity extends Item<LibraryProps> {
  get pk(): string {
    return `LIBRARY`
  }

  get sk(): string {
    return `LIBRARY#${this.props.data.id}`
  }

  get id(): string {
    return this.props.data.id ?? KSUID.randomSync().string
  }

  get name(): string {
    return this.props.data.name
  }

  get email(): string {
    return this.props.data.email
  }

  get createdAt(): number {
    return this.props.createdAt ?? Date.now()
  }

  getDynamoKeys(): Record<string, AttributeValue> {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk }
    }
  }

  toDynamoItem(): Record<string, AttributeValue> {
    return {
      ...this.getDynamoKeys(),
      data: { S: JSON.stringify(this.props.data) },
      createdAt: { N: this.createdAt.toString() ?? Date.now().toString() }
    }
  }

  static fromDynamoItem(item: Record<string, AttributeValue>): LibraryEntity {
    const { data, createdAt } = item

    return new LibraryEntity({
      data: JSON.parse(data.S ?? '{}'),
      createdAt: Number(createdAt.N) ?? Date.now()
    })
  }

  static create(props: LibraryProps): LibraryEntity {
    const library = new LibraryEntity({
      data: {
        id: props.data.id ?? KSUID.randomSync().string,
        name: props.data.name,
        email: props.data.email
      },
      createdAt: Date.now()
    })
    return library
  }
}

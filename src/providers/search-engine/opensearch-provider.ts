import { BookEntity } from '@/core/book'
import { SearchEngineProvider } from './search-engine-provider'
import { Client } from '@opensearch-project/opensearch'
import { defaultProvider } from '@aws-sdk/credential-provider-node'
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws'
import { IntegrationError } from '@/shared/integration-error'
import { QueryBooksSearchParams } from './dtos/opensearch-provider-dtos'

export class OpenSearchSearchEngineProvider implements SearchEngineProvider {
  private client: Client

  constructor() {
    if (!process.env.OPEN_SEARCH_DOMAIN_URL) {
      throw new IntegrationError('OpenSearch domain URL is not defined')
    }

    this.client = new Client({
      ...AwsSigv4Signer({
        region: process.env.AWS_REGION as string,
        service: 'es', // 'es' for OpenSearch Service, 'aoss' for OpenSearch serverless
        getCredentials: () => {
          const credentials = defaultProvider()
          return credentials()
        }
      }),
      node: `https://${process.env.OPEN_SEARCH_DOMAIN_URL}`
    })
  }

  async saveNewBook(data: BookEntity): Promise<void> {
    try {
      await this.client.index({
        index: 'books',
        body: {
          id: data.id,
          libraryId: data.libraryId,
          name: data.name,
          description: data.description
        }
      })
    } catch (error) {
      throw new IntegrationError('Error saving book index')
    }
  }

  async queryBooks({ author, description, name }: QueryBooksSearchParams): Promise<any> {
    try {
      const { body } = await this.client.search({
        index: 'books',
        body: {
          query: {
            bool: {
              must: [
                name ? { match: { name } } : undefined,
                author ? { match: { author } } : undefined,
                description ? { match: { description } } : undefined
              ].filter(Boolean)
            }
          }
        }
      })
      return body
    } catch (error) {
      throw new IntegrationError('Error querying books index')
    }
  }
}

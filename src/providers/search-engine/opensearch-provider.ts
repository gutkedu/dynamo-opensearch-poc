import { SearchEngineProvider } from './search-engine-provider'
import { Client } from '@opensearch-project/opensearch'
import { defaultProvider } from '@aws-sdk/credential-provider-node'
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws'
import { IntegrationError } from '@/shared/integration-error'
import { OpenSearchResponse, QueryBooksSearchParams } from './dtos/opensearch-provider-dtos'
import { OpenSearchIndexEnum } from './indexes/opensearch-index-enum'
import { BookEntity, BookProps } from '@/core/book'

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

  async saveNewBook(props: BookProps): Promise<void> {
    try {
      await this.client.index({
        id: props.data.id,
        index: OpenSearchIndexEnum.BOOKS,
        body: {
          ...props
        }
      })
    } catch (error) {
      throw new IntegrationError('Error saving book index')
    }
  }

  async queryBooks({ author, description, name }: QueryBooksSearchParams): Promise<BookEntity[]> {
    try {
      const { body } = await this.client.search<OpenSearchResponse<BookProps>>({
        index: OpenSearchIndexEnum.BOOKS,
        body: {
          query: {
            bool: {
              must: [
                name ? { match: { 'data.name': name } } : undefined,
                author ? { match: { 'data.author': author } } : undefined,
                description ? { match: { 'data.description': description } } : undefined
              ].filter(Boolean)
            }
          }
        }
      })

      console.log(JSON.stringify(body, null, 2))

      if (!body.hits.hits.length) {
        return []
      }

      return body.hits.hits.map((hit) => BookEntity.fromProps(hit._source))
    } catch (error) {
      throw new IntegrationError('Error querying books index')
    }
  }
}

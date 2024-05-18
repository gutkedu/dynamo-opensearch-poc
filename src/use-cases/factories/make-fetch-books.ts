import { OpenSearchSearchEngineProvider } from '@/providers/search-engine/opensearch-provider'
import { FetchBooksUseCase } from '../fetch-books'

export function makeFetchBooksUseCase() {
  const searchEngineProvider = new OpenSearchSearchEngineProvider()
  return new FetchBooksUseCase(searchEngineProvider)
}

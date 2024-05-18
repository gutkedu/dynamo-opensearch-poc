import { OpenSearchSearchEngineProvider } from '@/providers/search-engine/opensearch-provider'
import { SaveBookUseCase } from '../save-book'

export function makeSaveBookUseCase() {
  const searchEngineProvider = new OpenSearchSearchEngineProvider()
  return new SaveBookUseCase(searchEngineProvider)
}

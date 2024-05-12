/** Custom error class for integrations; 
 This error should be used when an integration fails, for example aws services, external apis, etc.
 */
export class IntegrationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'IntegrationError'
  }
}

import KSUID from 'ksuid'

export function validateKsuid(input: string): boolean {
  if (input.length !== 27) {
    return false
  }

  return KSUID.isValid(KSUID.parse(input).raw)
}

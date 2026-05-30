import { shouldUnmark } from '../app/util'

describe('shouldUnmark', () => {
  it('returns true when every row is already marked', () => {
    const result = shouldUnmark([true, true, true])
    assert(result === true, `Expected true but got ${result}`)
  })
  it('returns false when no row is marked', () => {
    const result = shouldUnmark([false, false])
    assert(result === false, `Expected false but got ${result}`)
  })
  it('returns false when rows are mixed', () => {
    const result = shouldUnmark([true, false, true])
    assert(result === false, `Expected false but got ${result}`)
  })
  it('returns false for an empty array', () => {
    const result = shouldUnmark([])
    assert(result === false, `Expected false but got ${result}`)
  })
  it('returns true for a single marked row', () => {
    const result = shouldUnmark([true])
    assert(result === true, `Expected true but got ${result}`)
  })
})

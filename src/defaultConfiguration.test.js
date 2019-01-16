import { describe } from 'riteway'
import defaultConfiguration from './defaultConfiguration'

describe('src/defaultConfiguration', async assert => {
  const expected = [
    'PORT',
    'HOST',
    'LOGLEVEL',
    'DATABASE_CONNECTION_POOL_SIZE',
    'DATABASE_SCHEMA',
    'DATABASE_USER',
    'DATABASE_PASSWORD',
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_NAME',
  ]

  assert({
    given: 'a default configuration',
    should: 'contain the only valid configuration keys',
    actual: Object.keys(defaultConfiguration),
    expected,
  })
})

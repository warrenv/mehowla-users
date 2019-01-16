import { describe } from 'riteway'
import { logger } from './logger'

describe('src/serviceManager/logger', async assert => {})

describe('log levels', async assert => {
  assert({
    given: 'a list of valid levels',
    should: 'have a property for each valid log level',
    actual: Object.keys(logger()),
    expected: ['name', 'raw', 'error', 'warning', 'info', 'debug', 'trace'],
  })
})

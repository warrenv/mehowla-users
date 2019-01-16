import { describe } from 'riteway'

import middleware from './defaultErrorHandler'

const serviceLookup = () => ({
  logger: { error: () => {} },
})

describe('src/middlewares/defaultErrorHandler', async assert => {
  {
    const expected = { status: 200, body: '{"message":"some error","code":1001}' }
    const ctx = {}
    const next = () => {
      const error = new Error(JSON.stringify({ message: 'some error', code: 1001 }))
      error.status = 200
      throw error
    }

    await middleware(serviceLookup)(ctx, next)

    assert({
      given: 'a request that throws an error',
      should: 'set the status and body response fields',
      actual: ctx,
      expected,
    })
  }

  {
    const expected = { status: 500, body: '{"message":"some error","code":1001}' }
    const ctx = {}
    const next = () => {
      const error = new Error(JSON.stringify({ message: 'some error', code: 1001 }))
      throw error
    }

    await middleware(serviceLookup)(ctx, next)

    assert({
      given: 'a request that throws an error without setting error status',
      should: 'set the status to 500',
      actual: ctx,
      expected,
    })
  }
})

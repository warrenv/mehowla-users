import { describe, Try } from 'riteway'
import { createConfiguration } from './configuration'

describe('src/serviceManager/configuration', async assert => {})

describe('createConfiguration', async assert => {
  const config = { FOO: '1', BAR: '2' }
  const localConfig = { FOO: '100' }

  {
    const configuration = createConfiguration()()

    assert({
      given: 'a call to .get() with no config and no overrides',
      should: 'return an empty object when .get() is called',
      actual: configuration.get(),
      expected: {},
    })
  }

  {
    const configuration = createConfiguration(config)()

    assert({
      given: 'a call to .get() with config and no overrides',
      should: 'return the original value for the item passed to get()',
      actual: configuration.get('FOO'),
      expected: config.FOO,
    })
  }

  {
    const configuration = createConfiguration(config)(localConfig)

    assert({
      given: 'a call to .get() with config and overrides',
      should: 'return the overridden value for the item passed to get()',
      actual: configuration.get('FOO'),
      expected: localConfig.FOO,
    })
  }

  {
    const configuration = createConfiguration(config)()

    assert({
      given: 'config',
      should: 'throw when an invalid item is passed to get()',
      actual: Try(configuration.get, 'AN_UNKNOWN'),
      expected: new Error(),
    })
  }

  {
    const configuration = createConfiguration(config)({ BAZ: true })

    assert({
      given: 'config and overrides not found in config',
      should: 'throw when an invalid item is passed to get()',
      actual: Try(configuration.get, 'BAZ'),
      expected: new Error(),
    })
  }
})

import { describe, Try } from 'riteway'
import sinon from 'sinon'
import R from 'ramda'
import { createServiceManager } from './createServiceManager'

describe('src/serviceManager/createServiceManager', async assert => {
  const config = { FOO: '1', BAR: '2' }
  const localConfig = { FOO: '100' }

  {
    const ServiceManager = createServiceManager({ config, localConfig })

    assert({
      given: 'a call to retrieve the configuration service',
      should: 'have "configuration" in the list',
      actual: ServiceManager.get('configuration')['name'],
      expected: 'configuration',
    })

    assert({
      given: 'a call to retrieve the logger service',
      should: 'have "logger" in the list',
      actual: ServiceManager.get('logger')['name'],
      expected: 'logger',
    })

    assert({
      given: 'a call to retrieve an unknown service name',
      should: 'throw',
      actual: Try(ServiceManager.get, 'unknown service'),
      expected: new Error(),
    })
  }

  {
    const service1 = { name: 'service1', setup: sinon.spy(), teardown: sinon.spy() }
    const service2 = { name: 'service2', setup: sinon.spy(), teardown: sinon.spy() }
    const ServiceManager = createServiceManager({ config, localConfig })

    ServiceManager.start([service1, service2])
    const allServices = R.pluck(['name'], Object.values(ServiceManager.get()))
    const actual = [
      allServices.includes(service1.name),
      allServices.includes(service2.name),
    ]

    assert({
      given: 'a call to .start() with a list services',
      should: 'return those services when .get() is called',
      actual,
      expected: [true, true],
    })

    assert({
      given: 'a call to .start() with a list of services',
      should: 'invoke the .setup() method of each service',
      actual: [service1.setup.calledOnce, service2.setup.calledOnce],
      expected: [true, true],
    })

    {
      const service1 = { name: 'service1', setup: sinon.spy(), teardown: sinon.spy() }
      const service2 = { name: 'service2', setup: sinon.spy(), teardown: sinon.spy() }

      const ServiceManager = createServiceManager({ config, localConfig })

      ServiceManager.start([service1, service2])
      ServiceManager.start([service1, service2])

      assert({
        given: 'more than one call to .start()',
        should: 'only invoke the .setup() method of each service once',
        actual: [service1.setup.callCount, service2.setup.callCount],
        expected: [1, 1],
      })
    }
  }

  {
    const service1 = { name: 'service1', setup: sinon.spy(), teardown: sinon.spy() }
    const service2 = { name: 'service2', setup: sinon.spy(), teardown: sinon.spy() }
    const ServiceManager = createServiceManager({ config, localConfig })

    ServiceManager.start([service1, service2])
    ServiceManager.stop()

    assert({
      given: 'a call to .stop()',
      should: 'invoke the .teardown() method of each service',
      actual: [service1.teardown.calledOnce, service2.teardown.calledOnce],
      expected: [true, true],
    })

    {
      const service1 = { name: 'service1', setup: sinon.spy(), teardown: sinon.spy() }
      const service2 = { name: 'service2', setup: sinon.spy(), teardown: sinon.spy() }

      const ServiceManager = createServiceManager({ config, localConfig })

      ServiceManager.stop([service1, service2])

      assert({
        given: 'a call to stop() before start()',
        should: 'not invoke .teardown()',
        actual: [service1.teardown.callCount, service2.teardown.callCount],
        expected: [0, 0],
      })
    }

    {
      const service1 = { name: 'service1', setup: sinon.spy(), teardown: sinon.spy() }
      const service2 = { name: 'service2', setup: sinon.spy(), teardown: sinon.spy() }

      const ServiceManager = createServiceManager({ config, localConfig })

      ServiceManager.start([service1, service2])
      ServiceManager.stop()
      ServiceManager.stop()

      assert({
        given: 'more than one call to .stop()',
        should: 'only invoke the .teardown() method of each service once',
        actual: [service1.teardown.callCount, service2.teardown.callCount],
        expected: [1, 1],
      })
    }
  }
})

import R from 'ramda'

import { createConfiguration } from './configuration'
import { logger } from './logger'

const arrayToObject = (acc, curr) => ({ ...acc, [curr.name]: curr })

const serviceFns = fn => R.pipe(
  R.filter(service => service[fn]),
  R.map(service => service[fn])
)

const createLookupFn = getTable => (name = undefined) => {
  if (name && !getTable[name]) {
    throw (new Error(`Unknown service name: ${name}`))
  }

  return name ? getTable[name] : getTable
}

export const createServiceManager = ({
  config = {},
  localConfig = {},
} = {}) => {
  let allServices = [createConfiguration(config)(localConfig), logger()]
  let lookup = createLookupFn(allServices.reduce(arrayToObject, {}))

  return {
    start: R.once(async services => {
      allServices = [...allServices, ...services]
      lookup = createLookupFn(allServices.reduce(arrayToObject, {}))

      await Promise.all(serviceFns('setup')(allServices).map(fn => fn(lookup)))
    }),
    get: name => lookup(name),
    stop: R.once(async () => {
      await Promise.all(serviceFns('teardown')(allServices).map(fn => fn(lookup)))
    }),
  }
}

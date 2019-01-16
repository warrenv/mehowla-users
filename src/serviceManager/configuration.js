import R from 'ramda'

export const createConfiguration = (config = {}) => (localConfig = {}) => {
  const mergedConfig = {
    ...config,
    ...R.pick(R.keys(config), localConfig),
  }

  const get = (item = undefined) => {
    if (item && !mergedConfig[item]) {
      throw (new Error(`Unknown configuration item: ${item}`))
    }
    return item ? mergedConfig[item] : mergedConfig
  }

  return Object.freeze({
    name: 'configuration',
    get,
  })
}

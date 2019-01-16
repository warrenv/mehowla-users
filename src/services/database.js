import mongoose from 'mongoose'
import R from 'ramda'

const buildUris = ({
  DATABASE_SCHEMA: schema,
  DATABASE_USER: user,
  DATABASE_PASSWORD: password,
  DATABASE_HOST: host,
  DATABASE_PORT: port,
  DATABASE_NAME: name,
}) => ({
  uri: `${schema}://${user}:${password}@${host}:${port}/${name}`,
  loggedUri: `${schema}://[filtered]:[filtered]@${host}:${port}/${name}`,
})

export default {
  name: 'database',
  setup: R.once((serviceLookup) => {
    const { configuration, logger } = serviceLookup()
    const { DATABASE_CONNECTION_POOL_SIZE } = configuration.get()
    const { uri, loggedUri } = buildUris(configuration.get())

    mongoose.connect(uri, { poolSize: DATABASE_CONNECTION_POOL_SIZE })
    mongoose.Promise = global.Promise
    mongoose.set('useCreateIndex', true)
    mongoose.set('useFindAndModify', false)

    mongoose.connection.on('connected', () => {
      logger.info(`Mongoose connection successful to ${loggedUri}`)
    })

    mongoose.connection.on('error', (err) => {
      logger.error(`Mongoose connection error has occured to ${loggedUri}: ${err} error`)
      throw err
    })

    mongoose.connection.on('disconnected', () => {
      logger.info(`Mongoose disconnected from ${loggedUri}`)
    })

    return true
  }),
  teardown: R.once(serviceLookup => {
    const { logger } = serviceLookup()

    mongoose.connection.close(() => {
      logger.info('Mongoose connection disconnected due to application termination')
    })

    return true
  }),
}

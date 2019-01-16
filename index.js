import app from './src/app'
import { createServiceManager } from './src/serviceManager'
import defaultConfiguration from './src/defaultConfiguration'
import services from './src/services'

try {
  const ServiceManager = createServiceManager({
    config: defaultConfiguration,
    localConfig: { ...process.env },
  })

  ServiceManager.start(services)

  const { PORT: port, HOST: host } = ServiceManager.get('configuration').get()

  app(ServiceManager.get).listen({ port, host }, () => {
    console.log(`HTTP server listening on ${host}:${port}`)
  })
} catch (err) {
  console.log(err)
  process.exit(1)
}

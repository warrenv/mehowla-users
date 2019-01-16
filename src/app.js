import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import Koa from 'koa'
import Router from 'koa-router'

import routes from './routes'
import { defaultErrorHandler } from './middlewares'

export default (serviceLookup) => {
  const app = new Koa()
  const router = new Router()

  app
    .use(defaultErrorHandler(serviceLookup))
    .use(helmet())
    .use(cors())
    .use(bodyParser())

  routes.forEach(
    ({ method, url, controllers }) => {
      const diControllers = controllers.map(controller => controller(serviceLookup))
      router[method](url, ...diControllers)
    })

  app.use(router.routes())
    .use(router.allowedMethods())

  return app
}

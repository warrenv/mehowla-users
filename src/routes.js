import { userRoutes } from './features/crud/users'

const rootController = () => (ctx, next) => {
  ctx.body = { message: 'This is the users api' }
}

export default [
  {
    method: 'get',
    url: '/',
    controllers: [rootController],
  },
  ...userRoutes,
]

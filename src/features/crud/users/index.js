import controllers from './controllers'

export const userRoutes = [
  {
    method: 'get',
    url: '/users',
    controllers: [controllers.list],
  },
  {
    method: 'post',
    url: '/users',
    controllers: [controllers.save],
  },
  {
    method: 'get',
    url: '/users/:id',
    controllers: [controllers.get],
  },
  {
    method: 'put',
    url: '/users/:id',
    controllers: [controllers.save],
  },
  {
    method: 'delete',
    url: '/users/:id',
    controllers: [controllers.remove],
  },
]

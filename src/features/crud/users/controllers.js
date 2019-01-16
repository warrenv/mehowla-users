import R from 'ramda'
import usersRepository from './repository'
import { validRequestFields } from './model'

export default {
  list: serviceLookup => {
    const list = usersRepository.list(serviceLookup)

    return async ctx => {
      ctx.body = await list()
    }
  },

  save: serviceLookup => {
    const save = usersRepository.save(serviceLookup)
    const create = usersRepository.create(serviceLookup)

    return async ctx => {
      const user = R.pick(validRequestFields, ctx.request.body)

      if (user.id) {
        ctx.body = await save(user)
        ctx.status = 200
      } else {
        ctx.body = await create(user)
        ctx.status = 201
      }
    }
  },

  get: serviceLookup => {
    const get = usersRepository.get(serviceLookup)

    return async ctx => {
      ctx.body = await get(ctx.params.id)
    }
  },

  remove: serviceLookup => {
    const remove = usersRepository.remove(serviceLookup)

    return async ctx => {
      await remove(ctx.params.id)
      ctx.status = 200
    }
  },
}

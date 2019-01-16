import R from 'ramda'
import User, { displayFields } from './model'

export const coerce = R.pick(displayFields)
const create = serviceLookup => async fields => coerce(await (new User(fields)).save())
const list = serviceLookup => async () => (await User.find()).map(u => coerce(u))
const get = serviceLookup => async id => coerce(await User.findById(id))
const remove = serviceLookup => id => User.findOneAndDelete({ _id: id })
const save = serviceLookup => async fields => {
  await User.findOneAndUpdate({ _id: fields.id }, { $set: fields })
  return get()(fields.id)
}

export default {
  list,
  get,
  save,
  create,
  remove,
}

import { describe } from 'riteway'
import { displayFields } from './model'
import { coerce } from './repository'

describe('src/features/crud/users/repository', async assert => {})

describe('coerce()', async assert => {
  const model = {
    id: '',
    email: '',
    name: '',
    playlist: '',
    textSize: '',
    theme: '',
    createdAt: '',
    updatedAt: '',
    FOO: '',
  }

  assert({
    given: 'an object with props other than displayFields',
    should: 'only return displayFields props',
    actual: Object.keys(coerce(model)),
    expected: displayFields,
  })
})

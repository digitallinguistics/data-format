import schemas   from './index.js'
import Validator from 'ajv'

const validator = new Validator

describe(`schemas`, function() {
  for (const [name, schema] of Object.entries(schemas)) {
    it(name, function() {
      validator.validateSchema(schema)
    })
  }
})

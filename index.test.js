import schemas   from './index.js'
import validator from './validator.js'

describe(`schemas`, function() {
  for (const [type, schema] of Object.entries(schemas)) {
    it(type, function() {

      validator.validateSchema(schema)

      if (schema.examples) {
        for (const example of schema.examples) {
          const validate = validator.getSchema(schema.$id)
          validate(example)
        }
      }

    })
  }
})

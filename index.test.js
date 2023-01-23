import { AssertionError } from 'node:assert'
import schemas   from './index.js'
import validator from './validator.js'

describe(`examples`, function() {

  for (const [type, schema] of Object.entries(schemas)) {

    it(type, function() {

      if (!schema.examples) return

      for (const [i, example] of Object.entries(schema.examples)) {

        const valid = validator.validate(schema, example)

        if (!valid) {
          throw new AssertionError({
            actual:   JSON.stringify(validator.errors, null, 2),
            expected: JSON.stringify(example, null, 2),
            message:  `The example at index ${ i } for the ${ type } schema is invalid.`,
            operator: `=`,
          })
        }

      }

    })

  }

})

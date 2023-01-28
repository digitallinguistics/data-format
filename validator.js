import addFormats from 'ajv-formats'
import schemas    from './index.js'
import Validator  from 'ajv'

const options = {
  allowUnionTypes: true,
}

const validator = new Validator(options)

addFormats(validator)

for (const schema of Object.values(schemas)) {
  validator.addSchema(schema)
}

export default validator

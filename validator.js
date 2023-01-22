import addFormats from 'ajv-formats'
import schemas    from './index.js'
import Validator  from 'ajv'

const options = {
  allowUnionTypes: true,
}

const validator = new Validator(options)
const cslRef    = `https://resource.citationstyles.org/schema/v1.0/input/json/csl-data.json#/items`

addFormats(validator)

for (const schema of Object.values(schemas)) {

  // The CSL Cite Item schema references the CSL Data schema using a relative URI: `csl-data.json#/items`.
  // However, the `$id` of the CSL Data schema is a full, absolute URI,
  // so in order for validation to succeed, the `itemData/$ref` property of the CSL Cite Item
  // must be set to the `$id` of the CSL Data schema.
  if (schema.$id.includes(`csl-citation.json`)) {
    schema.properties.citationItems.items.properties.itemData.$ref = cslRef
  }

  validator.addSchema(schema)

}

export default validator

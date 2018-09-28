/* eslint-disable
  guard-for-in,
  no-param-reassign,
*/

// IMPORTS
const AJV            = require(`ajv`);
const { getSchemas } = require('./utilities');

// SETUP
const ajv = new AJV();

// VARIABLES
let schemas;

describe(`schemas`, () => {

  beforeAll(async function loadSchemas() {
    schemas = await getSchemas();
  });

  it(`are valid against JSON Schema Draft 04`, () => {
    for (const [, schema] of schemas) {
      const valid = ajv.validateSchema(schema);
      if (valid) expect(valid).toBe(true);
      else fail(ajv.errorsText());
    }
  });

});

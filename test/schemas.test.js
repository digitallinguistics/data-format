/* eslint-disable
  guard-for-in,
  new-cap,
  no-param-reassign,
*/

// IMPORTS
const { AJV, getSchemas } = require('./utilities');

// VARIABLES
let ajv;
let schemas;

describe(`schemas`, () => {

  beforeAll(async function loadSchemas() {
    ajv     = await AJV();
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

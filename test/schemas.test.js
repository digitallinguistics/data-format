/* eslint-disable
  func-names,
  guard-for-in,
  prefer-arrow-callback,
*/

const AJV = require('ajv');
const schemas = require('../schemas');

const ajv = new AJV();

describe('schemas: ', function() {

  for (const schema in schemas) {

    it(`${schema} is valid against JSON Schema Draft 4`, function() {

      const valid = ajv.validateSchema(schemas[schema]);

      if (valid) expect(valid).toBe(true);
      else fail(ajv.errorsText());

    });

  }

});

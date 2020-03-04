/**
 * This test checks that all the example data in each schema is valid
 */

/* eslint-disable
  max-nested-callbacks,
 */

// IMPORTS
const {
  AJV,
  getSchemas,
} = require(`./utilities`);

describe(`schemas`, () => {

  let ajv;
  let schemas;

  beforeAll(async () => {
    ajv     = await AJV();
    schemas = await getSchemas();
  });

  it(`validate against example data`, () => {

    schemas.forEach(schema => {

      const IDRegExp     = /\.io\/(?<schemaID>.+).json/u;
      const { schemaID } = IDRegExp.exec(schema.$id).groups;

      const validate = data => ajv.validate(schemaID, data);

      if (!schema.examples) {
        return fail(`${schemaID} does not have example data`);
      }

      schema.examples.forEach(ex => {
        const valid = validate(ex);
        if (valid) expect(valid).toBe(true);
        else fail(`${schemaID}: ${ajv.errorsText()}`);
      });

    });

  });

});

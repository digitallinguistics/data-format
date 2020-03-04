/**
 * This test checks that all the example data in each schema is valid
 */

/* eslint-disable
  max-nested-callbacks,
 */

import { createValidator, getSchemas } from './utilities/index.js';

describe(`schemas`, () => {

  it(`validate against example data`, async () => {

    const ajv     = await createValidator();
    const schemas = await getSchemas();

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

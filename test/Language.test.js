/* eslint-disable
  func-names,
  prefer-arrow-callback,
*/

const ajv          = require('./ajv');
const { Language } = require('../schemas');
const validate     = ajv.compile(Language);

const data = {};

describe(`Language`, function() {

  it(`validates properly-formatted data`, function() {
    const valid = validate(data);
    if (validate.errors) fail(JSON.stringify(validate.errors, null, 2));
    expect(valid).toBe(true);
  });

  xit(`invalidates incorrectly-formatted data`, function() {

  });

});

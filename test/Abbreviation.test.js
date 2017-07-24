/* eslint-disable
  func-names,
  prefer-arrow-callback,
*/

const ajv              = require('./ajv');
const { Abbreviation } = require('../schemas');
const validate         = ajv.compile(Abbreviation);

describe(`Abbreviation`, function() {

  it(`validates properly-formatted data`, function() {
    const data  = `chiti`;
    const valid = validate(data);
    if (validate.errors) fail(JSON.stringify(validate.errors, null, 2));
    expect(valid).toBe(true);
  });

  it(`invalidates incorrectly-formatted data`, function() {

    const badAbbr = `bad abbr`;
    expect(validate(badAbbr)).toBe(false);

    const emptyAbbr = ``;
    expect(validate(emptyAbbr)).toBe(false);

  });

});

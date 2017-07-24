/* eslint-disable
  func-names,
  prefer-arrow-callback,
*/

const ajv      = require('./ajv');
const { URL }  = require('../schemas');
const validate = ajv.compile(URL);

describe(`URL`, function() {

  it(`validates properly-formatted data`, function() {
    const data  = `https://api.digitallinguistics.io/languages/12345/`;
    const valid = validate(data);
    if (validate.errors) fail(JSON.stringify(validate.errors, null, 2));
    expect(valid).toBe(true);
  });

  it(`invalidates incorrectly-formatted data`, function() {

    const badURL = `12345`;
    expect(validate(badURL)).toBe(false);

    const emptyURL = ``;
    expect(validate(emptyURL)).toBe(false);

  });

});

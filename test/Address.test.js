/* eslint-disable
  func-names,
  prefer-arrow-callback,
*/

const ajv         = require('./ajv');
const { Address } = require('../schemas');
const validate    = ajv.compile(Address);

const data = {
  apartmentNumber: `B`,
  country: `United States`,
  locality: `New York`,
  postalBoxNumber: `1234`,
  postalCode: `12345-1234`,
  region: `New York`,
  streetAddress: `555 Market St`,
  type: `Address`,
};

describe(`Address`, function() {

  it(`validates properly-formatted data`, function() {
    const valid = validate(data);
    if (validate.errors) fail(JSON.stringify(validate.errors, null, 2));
    expect(valid).toBe(true);
  });

  it(`invalidates incorrectly-formatted data`, function() {

    const badApt = { apartmentNumber: 12 };
    expect(validate(badApt)).toBe(false);

    const badPOBox = { postalBoxNumber: 1234 };
    expect(validate(badPOBox)).toBe(false);

    const badPostalCode = { postalCode: 12345 };
    expect(validate(badPostalCode)).toBe(false);

  });

});

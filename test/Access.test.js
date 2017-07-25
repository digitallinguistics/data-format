/* eslint-disable
  func-names,
  prefer-arrow-callback,
*/

const ajv              = require('./ajv');
const { Access } = require('../schemas');
const validate         = ajv.compile(Access);

describe(`Access`, function() {

  it(`validates properly-formatted data`, function() {

    const data  = {
      AILLA:   `password`,
      ELAR:    `Community Member`,
      notes:   { eng: `Speaker also requested that this text only be shared with family members.` },
      speaker: `family`,
    };

    const valid = validate(data);
    if (validate.errors) fail(JSON.stringify(validate.errors, null, 2));
    expect(valid).toBe(true);

  });

  it(`invalidates incorrectly-formatted data`, function() {

    const data = { family: true };
    expect(validate(data)).toBe(false);

  });

});

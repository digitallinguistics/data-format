/* eslint-disable
  array-element-newline,
  func-names,
  prefer-arrow-callback,
*/

const ajv          = require('./ajv');
const { Language } = require('../schemas');
const validate     = ajv.compile(Language);

const data = {
  abbreviation: `chiti`,
  autonym: {
    apa:    `Sitimaša`,
    ipa:    `Sitimaʃa`,
    modern: `Sitimaxa`,
  },
  dateCreated:  `2017-07-24T17:41:18.539Z`,
  dateModified: `2017-07-24T17:41:18.539Z`,
  glottolog:    `chit1248`,
  iso:          `iso`,
  locations: [{ name: { eng: `Charenton` } }],
  names: [
    `Chitimacha`,
    `Sitimaxa`,
  ],
  orthographies: [],
  phonemes: [],
  type: `Language`,
  url: `https://api.digitallinguistics.io/languages/chitimacha/`,
};

describe(`Language`, function() {

  it(`validates properly-formatted data`, function() {
    const valid = validate(data);
    if (validate.errors) fail(JSON.stringify(validate.errors, null, 2));
    expect(valid).toBe(true);
  });

  it(`invalidates incorrectly-formatted data`, function() {

    const missingNames = {};
    expect(validate(missingNames)).toBe(false);

    const badNames = { names: [{}] };
    expect(validate(badNames)).toBe(false);

  });

});

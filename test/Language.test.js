/* eslint-disable
  array-element-newline,
  func-names,
  prefer-arrow-callback,
*/

const ajv          = require('./ajv');
const { Language } = require('../schemas');
const validate     = ajv.compile(Language);

const data = {
  abbreviation:    `chiti`,
  additionalNames: [`Sitimaxa`],
  autonym:         {
    apa:    `Sitimaša`,
    ipa:    `Sitimaʃa`,
    modern: `Sitimaxa`,
  },
  dateCreated:        `2017-07-24T17:41:18.539Z`,
  dateModified:       `2017-07-24T17:41:18.539Z`,
  defaultOrthography: `modern`,
  glottolog:          `chit1248`,
  iso:                `iso`,
  locations:          [{ name: { eng: `Charenton` } }],
  name:               { eng: `Chitimacha` },
  orthographies:      [],
  phonemes:           [],
  type:               `Language`,
  url:                `https://api.digitallinguistics.io/languages/chitimacha/`,
};

describe(`Language`, function() {

  it(`validates properly-formatted data`, function() {
    const valid = validate(data);
    if (validate.errors) fail(JSON.stringify(validate.errors, null, 2));
    expect(valid).toBe(true);
  });

  it(`invalidates incorrectly-formatted data`, function() {

    const badName     = { name: `Chitimacha` };
    const missingName = {};
    expect(validate(missingName)).toBe(false);
    expect(validate(badName)).toBe(false);

  });

});

/* eslint-disable
  array-bracket-newline,
  array-element-newline,
  func-names,
  prefer-arrow-callback,
*/

const ajv             = require('./ajv');
const { Orthography } = require('../schemas');
const validate        = ajv.compile(Orthography);

const data = {
  abbreviation: `mod`,
  direction: `ltr-ttb`,
  graphemes: [
    {
      allographs: [`a`],
      form: `A`,
      pronunciations: [`a`],
    },
    {
      form: `aa`,
      pronunciations: [`aː`],
    },
    {
      allographs: [`b`],
      form: `B`,
      pronunciations: [`pˀ`],
    },
    {
      allographs: [`c`],
      form: `C`,
      pronunciations: [`t͡ʃ`],
    },
    {
      allographs: [`d`],
      form: `D`,
      pronunciations: [`tˀ`],
    },
  ],
  name: { eng: `Modern` },
  notes: [{
    dateCreated:  `2017-07-24T17:41:18.539Z`,
    dateModified: `2017-07-24T17:41:18.539Z`,
    language:     `eng`,
    noteType:     `general`,
    text:         `This orthography was originally created by Julian Granberry for the Chitimacha Tribe, and was based in part on the phonemic orthography utilized by Morris Swadesh. Daniel W. Hieber later suggested minor changes that were implemented during the Chitimacha Rosetta Stone project.`,
  }],
  punctuation: [
    `!`,
    `"`,
    `'`,
    `.`,
    `,`,
    `?`,
  ],
  tags: {},
  type: `Orthography`,
};

describe(`Orthography`, function() {

  it(`validates properly-formatted data`, function() {
    const valid = validate(data);
    if (validate.errors) fail(JSON.stringify(validate.errors, null, 2));
    expect(valid).toBe(true);
  });

  it(`invalidates incorrectly-formatted data`, function() {

    const badGraphemes = {
      graphemes: [`a`, `aa`, `b`, `c`, `d`],
      name: { eng: `mod` },
    };

    expect(validate(badGraphemes)).toBe(false);

    const badType = {
      graphemes: [],
      name: {},
      type: `orthography`,
    };

    expect(validate(badType)).toBe(false);

  });

});

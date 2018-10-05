// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  abbreviation:    `chiti`,
  access:          {
    AILLA: `password`,
    notes: {
      eng: `Materials on this language should not be made available to non-tribal members without permission.`,
    },
  },
  additionalNames: [`Sitimaxa`],
  autonym:         {
    apa:    `Sitimaša`,
    ipa:    `Sitimaʃa`,
    modern: `Sitimaxa`,
  },
  contributors:       [
    {
      familyName: `Swadesh`,
      givenName:  `Morris`,
      roles:      [`researcher`],
      type:       `Person`,
    },
    {
      familyName: `Paul`,
      givenName:  `Benjamin`,
      roles:      [`speaker`],
    },
  ],
  dateCreated:        `2017-07-24T17:41:18.539Z`,
  dateModified:       `2017-07-24T17:41:18.539Z`,
  defaultOrthography: `modern`,
  glottolog:          `chit1248`,
  id:                 `46d3ad45-d1b8-4656-b496-dcb39203c5a9`,
  iso:                `iso`,
  locations:          [{ name: { eng: `Charenton` } }],
  name:               { eng: `Chitimacha` },
  notes:              [
    {
      language: `eng`,
      text:     `Chitimacha is a language isolate.`,
    },
  ],
  orthographies:      [],
  phonemes:           [],
  references:         [
    {
      authors:         [{ firstName: `Morris`, lastName: `Swadesh` }],
      city:            `New York`,
      editors:         [{ firstName: `Cornelius`, lastName: `Osgood` }],
      pages:           `312-336`,
      publication:     `Linguistic Structures of Native America`,
      publicationType: `book section`,
      title:           `Chitimacha`,
      type:            `BibliographicReference`,
      year:            1946,
    },
  ],
  tags: {
    morphologicalType: `synthetic`,
  },
  type:               `Language`,
  url:                `https://api.digitallinguistics.io/languages/chitimacha/`,
};

describe(`Language`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Language`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`invalidates: bad type`, () => {
    const badType = { type: `bad type` };
    const badData = { ...data, ...badType };
    expect(validate(badData)).toBe(false);
  });

});

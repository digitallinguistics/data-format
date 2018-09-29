// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
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

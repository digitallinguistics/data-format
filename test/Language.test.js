// IMPORTS
const { AJV, getSchemas } = require(`./utilities`);

// VARIABLES
let ajv;
let Language;
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

  beforeAll(async function loadSchema() {
    ajv           = await AJV();
    const schemas = await getSchemas();
    Language      = schemas.get(`Language`);
    validate      = ajv.compile(Language);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    fail(JSON.stringify(validate.errors, null, 2));
  });

  it(`invalidates: bad type`, () => {
    const badType = { type: `bad type` };
    const badData = { ...data, ...badType };
    expect(validate(badData)).toBe(false);
  });

});

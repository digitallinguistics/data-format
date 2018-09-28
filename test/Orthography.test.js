// IMPORTS
const { AJV, getSchemas } = require(`./utilities`);

// VARIABLES
let ajv;
let Orthography;
let validate;

// VALID SAMPLE DATA
const data = {
  abbreviation: `mod`,
  direction:    `ltr-ttb`,
  graphemes:    [
    {
      allographs:     [`a`],
      form:           `A`,
      pronunciations: [`a`],
    },
    {
      form:           `aa`,
      pronunciations: [`aː`],
    },
    {
      allographs:     [`b`],
      form:           `B`,
      pronunciations: [`pˀ`],
    },
    {
      allographs:     [`c`],
      form:           `C`,
      pronunciations: [`t͡ʃ`],
    },
    {
      allographs:     [`d`],
      form:           `D`,
      pronunciations: [`tˀ`],
    },
  ],
  name:  { eng: `Modern` },
  notes: [
    {
      dateCreated:  `2017-07-24T17:41:18.539Z`,
      dateModified: `2017-07-24T17:41:18.539Z`,
      language:     `eng`,
      noteType:     `general`,
      text:         `This orthography was originally created by Julian Granberry for the Chitimacha Tribe, and was based in part on the phonemic orthography utilized by Morris Swadesh. Daniel W. Hieber later suggested minor changes that were implemented during the Chitimacha Rosetta Stone project.`,
    },
  ],
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

describe(`Orthography`, () => {

  beforeAll(async function loadSchema() {
    ajv           = await AJV();
    const schemas = await getSchemas();
    Orthography   = schemas.get(`Orthography`);
    validate      = ajv.compile(Orthography);
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

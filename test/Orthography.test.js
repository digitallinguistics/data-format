// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
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
  id:    `46d3ad45-d1b8-4656-b496-dcb39203c5a9`,
  link:  `https://data.digitallinguistics.io/languages/Chitimacha/orthographies/Modern`,
  name:  { eng: `Modern` },
  notes: [
    {
      dateCreated:  `2017-07-24T17:41:18.539Z`,
      dateModified: `2017-07-24T17:41:18.539Z`,
      language:     `eng`,
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
  url:  `https://api.digitallinguistics.io/languages/Chitimacha/orthographies/Modern.json`,
};

describe(`Orthography`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Orthography`, d);
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

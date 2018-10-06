// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  contributors: [
    {
      familyName: `John`,
      givenName:  `Smith`,
    },
  ],
  dateCreated:  `2018-10-05T15:26:23.070Z`,
  dateModified: `2018-10-05T15:26:23.070Z`,
  dateRecorded: `2018-10-05T15:26:23.070Z`,
  genre:        `mythological narrative`,
  id:           `46d3ad45-d1b8-4656-b496-dcb39203c5a9`,
  link:         `https://data.digitallinguistics.io/languages/Chitimacha/texts/A1`,
  title:        {
    eng: `How the world began`,
  },
  url:        `https://api.digitallinguistics.io/languages/Chitimacha/texts/A1.json`,
  utterances: [
    {
      transcription: {},
      translation:   {},
      words:         [],
    },
  ],
};

describe(`Text`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Text`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

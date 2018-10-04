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
  genre:     `mythological narrative`,
  id:        `46d3ad45-d1b8-4656-b496-dcb39203c5a9`,
  sentences: [
    {
      transcription: {},
      translation:   {},
      words:         [],
    },
  ],
  title: {
    eng: `How the world began`,
  },
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

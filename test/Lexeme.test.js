// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  dateCreated:  `2018-10-05T15:25:46.045Z`,
  dateModified: `2018-10-05T15:26:23.070Z`,
  id:           `46d3ad45-d1b8-4656-b496-dcb39203c5a9`,
  lemma:        {},
  morphemeType: {
    eng: `root`,
  },
  notes:        [
    {
      language: `eng`,
      noteType: `sociocultural`,
      text:     `Only used among western varieties`,
    },
  ],
  senses:   [],
};

describe(`Lexeme`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Lexeme`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`invalidates: bad features`, () => {
    const badFeatures = { features: { person: 1 } };
    const badData     = { ...data, ...badFeatures };
    expect(validate(badData)).toBe(false);
  });

});

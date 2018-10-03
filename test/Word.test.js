// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  endTime:       1.010,
  morphemes:     [],
  phonemes:      [
    {
      endTime:   1.010,
      phoneme:   `a`,
      startTime: 1.000,
    },
  ],
  startTime:     1.000,
  transcription: {},
};

describe(`Word`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Word`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

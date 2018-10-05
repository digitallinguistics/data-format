// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  dateCreated:  `2018-10-05T15:26:23.070Z`,
  dateModified: `2018-10-05T15:26:23.070Z`,
  dateRecorded: `2018-10-05`,
  filename:     `recording.wav`,
  id:           `46d3ad45-d1b8-4656-b496-dcb39203c5a9`,
  url:          `https://api.digitallinguistics.io/languages/Chitimacha/files/recording.wav`,
};

describe(`Media`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Media`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

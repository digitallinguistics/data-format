// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  abbreviation: `day1`,
  access:       {
    ELAR: `Researcher`,
  },
  dateCreated:  `2018-10-04`,
  dateModified: `2018-10-04`,
  id:           `46d3ad45-d1b8-4656-b496-dcb39203c5a9`,
  link:         `https://data.digitallinguistics.io/languages/Chitimacha/bundles/day1`,
  locations:    [],
  media:        [],
  name:         {
    eng: `Elicitation Day 1`,
  },
  notes:  [],
  people: [],
  tags:   {},
  texts:  [],
  type:   `Bundle`,
  url:    `https://mylanguage.com/bundles/day1.json`,
};

describe(`Bundle`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Bundle`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

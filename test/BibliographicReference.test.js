// IMPORTS
const {
  AJV,
  getSchemas,
} = require(`./utilities`);

// VARIABLES
let ajv;
let data;
let validate;

describe(`BibliographicReference`, () => {

  beforeAll(async function setup() {
    const schemas = await getSchemas();
    const schema = schemas.get(`BibliographicReference`);
    data     = schema.examples[0];
    ajv      = await AJV();
    validate = d => ajv.validate(`BibliographicReference`, d);
  });

  it(`validates: negative years`, () => {
    const negativeYear     = { year: -196 };
    const negativeYearData = { ...data, ...negativeYear };
    expect(validate(negativeYearData)).toBe(true);
  });

});

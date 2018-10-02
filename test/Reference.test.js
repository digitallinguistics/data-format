// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {};

describe(`Reference`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Reference`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`validates: year`, () => {
    const negativeYear     = { year: -196 };
    const negativeYearData = { ...data, ...negativeYear };
    expect(validate(negativeYearData)).toBe(true);
  });

});

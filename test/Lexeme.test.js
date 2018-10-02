// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {};

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

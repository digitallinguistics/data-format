// IMPORTS
const {
  AJV,
  getSchemas,
} = require(`./utilities`);

// VARIABLES
let ajv;
let data;
let validate;

describe(`Lexeme`, () => {

  beforeAll(async function setup() {
    const schemas = await getSchemas();
    const schema = schemas.get(`Lexeme`);
    data     = schema.examples[2];
    ajv      = await AJV(); // eslint-disable-line new-cap
    validate = d => ajv.validate(`Lexeme`, d);
  });

  it(`invalidates: bad features`, () => {
    const badFeatures = { features: { person: 1 } };
    const badData     = { ...data, ...badFeatures };
    expect(validate(badData)).toBe(false);
  });

});

// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const objectData = {
  ctm: `Sitimaxa`,
  eng: `Chitimacha`,
  fra: `Chetimacha`,
};

const stringData = `Chitimacha`;

describe(`MultiLangString`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`MultiLangString`, d);
  });

  it(`validates: Object`, () => {
    const valid = validate(objectData);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`validates: String`, () => {
    const valid = validate(stringData);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

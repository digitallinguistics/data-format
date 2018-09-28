// IMPORTS
const { AJV, getSchemas } = require(`./utilities`);

// VARIABLES
let ajv;
let Abbreviation;
let validate;

// VALID SAMPLE DATA
const data = `chiti`;

describe(`Abbreviation`, () => {

  beforeAll(async function loadSchema() {
    ajv           = await AJV();
    const schemas = await getSchemas();
    Abbreviation  = schemas.get(`Abbreviation`);
    validate      = ajv.compile(Abbreviation);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    fail(JSON.stringify(validate.errors, null, 2));
  });

  it(`invalidates`, () => {

    const badAbbr = `bad abbr`;
    expect(validate(badAbbr)).toBe(false);

    const emptyAbbr = ``;
    expect(validate(emptyAbbr)).toBe(false);

  });

});

// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = `chiti`;

describe(`Abbreviation`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Abbreviation`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`invalidates`, () => {

    const badAbbr = `bad abbr`;
    expect(validate(badAbbr)).toBe(false);

    const emptyAbbr = ``;
    expect(validate(emptyAbbr)).toBe(false);

  });

});

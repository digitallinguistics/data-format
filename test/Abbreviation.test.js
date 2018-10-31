// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

describe(`Abbreviation`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Abbreviation`, d);
  });

  it(`invalidates`, () => {

    const badAbbr = `bad abbr`;
    expect(validate(badAbbr)).toBe(false);

    const emptyAbbr = ``;
    expect(validate(emptyAbbr)).toBe(false);

  });

});

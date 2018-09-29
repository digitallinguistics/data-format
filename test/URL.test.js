/* eslint-disable
  no-shadow,
*/

// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = `https://api.digitallinguistics.io/languages/12345/`;

describe(`URL`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`URL`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`invalidates`, () => {

    const badURL = `12345`;
    expect(validate(badURL)).toBe(false);

    const emptyURL = ``;
    expect(validate(emptyURL)).toBe(false);

  });

});

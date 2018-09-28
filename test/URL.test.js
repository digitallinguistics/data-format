/* eslint-disable
  no-shadow,
*/

// IMPORTS
const { AJV, getSchemas } = require(`./utilities`);

// VARIABLES
let ajv;
let URL;
let validate;

// VALID SAMPLE DATA
const data = `https://api.digitallinguistics.io/languages/12345/`;

describe(`URL`, () => {

  beforeAll(async function loadSchema() {
    ajv           = await AJV();
    const schemas = await getSchemas();
    URL           = schemas.get(`URL`);
    validate      = ajv.compile(URL);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    fail(JSON.stringify(validate.errors, null, 2));
  });

  it(`invalidates`, () => {

    const badURL = `12345`;
    expect(validate(badURL)).toBe(false);

    const emptyURL = ``;
    expect(validate(emptyURL)).toBe(false);

  });

});

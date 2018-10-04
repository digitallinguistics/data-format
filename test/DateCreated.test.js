// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const dateData     = `2018-10-04`;
const datetimeData = `2018-10-04T03:01:20.521Z`;

describe(`DateCreated`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`DateCreated`, d);
  });

  it(`validates: dateData`, () => {
    const valid = validate(dateData);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`validates: datetimeData`, () => {
    const valid = validate(datetimeData);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

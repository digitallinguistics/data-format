// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  apartmentNumber: `B`,
  country:         `United States`,
  locality:        `New York`,
  postalBoxNumber: `1234`,
  postalCode:      `12345-1234`,
  region:          `New York`,
  streetAddress:   `555 Market St`,
  type:            `Address`,
};

describe(`Address`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Address`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`invalidates: bad type`, () => {
    const badType = { type: `bad type` };
    const badData = { ...data, ...badType };
    expect(validate(badData)).toBe(false);
  });

});

// IMPORTS
const { AJV, getSchemas } = require(`./utilities`);

// VARIABLES
let ajv;
let Address;
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

  beforeAll(async function loadSchema() {
    ajv           = await AJV();
    const schemas = await getSchemas();
    Address       = schemas.get(`Address`);
    validate      = ajv.compile(Address);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    fail(JSON.stringify(validate.errors, null, 2));
  });

  it(`invalidates: bad type`, () => {
    const badType = { type: `bad type` };
    const badData = { ...data, ...badType };
    expect(validate(badData)).toBe(false);
  });

});

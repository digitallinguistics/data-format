// IMPORTS
const { AJV, getSchemas } = require(`./utilities`);

// VARIABLES
let ajv;
let Access;
let validate;

// VALID SAMPLE DATA
const data  = {
  AILLA:   `password`,
  ELAR:    `Community Member`,
  notes:   { eng: `Speaker also requested that this text only be shared with family members.` },
  speaker: `family`,
};

describe(`Access`, () => {

  beforeAll(async function loadSchema() {
    ajv           = await AJV();
    const schemas = await getSchemas();
    Access        = schemas.get(`Access`);
    validate      = ajv.compile(Access);
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

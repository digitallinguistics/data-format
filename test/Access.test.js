// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data  = {
  AILLA:   `password`,
  ELAR:    `Community Member`,
  notes:   { eng: `Speaker also requested that this text only be shared with family members.` },
  speaker: `family`,
};

describe(`Access`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Access`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

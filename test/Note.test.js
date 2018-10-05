// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  dateCreated:  `2018-10-05T15:26:23.070Z`,
  dateModified: `2018-10-05T15:26:23.070Z`,
  language:     `eng`,
  source:       `DWH`,
  tags:         {
    status: `needs review`,
  },
  text:     `This is a test note.`,
};

describe(`Note`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Note`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const data = {
  id:            `12345`,
  index:         1,
  key:           `man1`,
  referenceType: `Lexeme`,
  url:           `https://api.digitallinguistics.io/languages/Chitimacha/lexemes/man1`,
};

describe(`DatabaseReference`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`DatabaseReference`, d);
  });

  it(`validates`, () => {
    const valid = validate(data);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});

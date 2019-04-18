// IMPORTS
const {
  AJV,
  getSchemas,
} = require(`./utilities`);

// VARIABLES
let ajv;
let data;
let validate;

describe(`Translation`, () => {

  beforeAll(async function setup() {
    const schemas = await getSchemas();
    const schema = schemas.get(`Translation`);
    data     = schema.examples[0];
    ajv      = await AJV();
    validate = d => ajv.validate(`Translation`, d);
  });

  it(`invalidates: badTagColon`, () => {
    const languageTagRegex = require('ietf-language-tag-regex') 
 
    const badTagColon = { title: 'en:' };
    expect(validate(languageTagRegex().test(badTagColon))).toBe(false);
    
    const badTagChar = { title: 'én-GB' };
    expect(validate(languageTagRegex().test(badTagChar))).toBe(false);

  });

});
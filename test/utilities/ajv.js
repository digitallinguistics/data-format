// IMPORTS
const AJV        = require('ajv');
const getSchemas = require(`./getSchemas`);

// SETUP
const ajv = new AJV();

// VARIABLES
let schemasLoaded = false;

/**
 * Adds each of the schemas to AJV, so that they can be used to validate other schemas
 * @return {Promise<AJV>} Returns a Promise that resolves to the configured AJV Object
 */
async function setup() {

  if (schemasLoaded) return ajv;

  const schemas = await getSchemas();

  for (const [, schema] of schemas) {
    const IDRegExp = /schemas\/(?<id>.+)-/;
    const { id }   = IDRegExp.exec(schema.id).groups;
    ajv.addSchema(schema, id);
  }

  schemasLoaded = true;
  return ajv;

}

module.exports = setup;

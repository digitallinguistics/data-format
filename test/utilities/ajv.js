// IMPORTS
const AJV        = require(`ajv`);
const getSchemas = require(`./getSchemas`);

// SETUP
const ajv = new AJV({ extendRefs: true });

// VARIABLES
let schemasLoaded = false;

/**
 * Adds each of the schemas to AJV
 * @return {Promise<AJV>}
 */
async function loadSchemas() {

  if (schemasLoaded) return ajv;

  const schemas = await getSchemas();

  for (const [, schema] of schemas) {

    // Extract the ID from the "id" property of the schema
    const IDRegExp = /schemas\/(?<id>.+)-/;
    const { id }   = IDRegExp.exec(schema.id).groups;

    // Remove version number from ID for local testing purposes
    schema.id = schema.id.replace(/-.+?(\.json)/, `$1`);

    try {
      ajv.addSchema(schema, id);
    } catch (e) {
      console.error(`${id} schema is invalid.`);
      console.error(e);
    }

  }

  schemasLoaded = true;
  return ajv;

}

// EXPORT
module.exports = loadSchemas;

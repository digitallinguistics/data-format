import AJV from 'ajv';
import { createRequire } from 'module';
import getSchemas from './getSchemas.js';

const require = createRequire(import.meta.url);

const GeoJSON = require(`./GeoJSON.json`);

const ajv = new AJV({ extendRefs: true });

let schemasLoaded = false;

/**
 * Adds each of the schemas to AJV
 */
async function createValidator() {

  if (schemasLoaded) return ajv;

  const schemas = await getSchemas();

  for (const [, schema] of schemas) {

    // Extract the ID from the "id" property of the schema
    const IDRegExp = /\.io\/(?<$id>.+)-/u;
    const { $id }  = IDRegExp.exec(schema.$id).groups;

    // Remove version number from ID for local testing purposes
    schema.$id = schema.$id.replace(/-.+?(?<ext>\.json)/u, `$<ext>`);

    try {
      ajv.addSchema(schema, $id);
    } catch (e) {
      console.error(`${$id} schema is invalid.`);
      console.error(e);
    }

  }

  // Load GeoJSON schema
  ajv.addSchema(GeoJSON, `GeoJSON`);

  schemasLoaded = true; // eslint-disable-line require-atomic-updates

  return ajv;

}

export default createValidator;

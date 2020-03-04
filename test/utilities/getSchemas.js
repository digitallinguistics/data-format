// IMPORTS
const path        = require(`path`);
const { readdir } = require(`fs`).promises;
const yamljs      = require(`yamljs`);

// VARIABLES
const schemasPath = path.join(__dirname, `../../schemas/yaml`);
let schemas;

/**
 * Retrieves the schemas from /schemas/yaml, converts them to JSON, and returns a Map of the schemas. This function is a singleton: the schemas are only loaded once.
 */
async function getSchemas() {

  if (schemas) return schemas;

  const IDRegExp = /\.io\/(?<schemaID>.+)-/u;
  const filenames = await readdir(schemasPath, `utf8`);

  schemas = filenames
  .map(filename => yamljs.load(path.join(schemasPath, filename)))
  .reduce((map, schema) => {
    const { schemaID } = IDRegExp.exec(schema.$id).groups;
    map.set(schemaID, schema);
    return map;
  }, new Map);

  return schemas;

}

module.exports = getSchemas;

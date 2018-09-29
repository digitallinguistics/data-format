/**
 * Converts all the YAML versions of the DLx schemas to JSON,
 * and saves them to /schemas/json
 */

// IMPORTS
const path   = require(`path`);
const yamljs = require(`yamljs`);

const {
  readdir,
  readFile,
  writeFile,
} = require(`fs`).promises;

// VARIABLES
const schemasPath = path.join(__dirname, `../schemas`);

// METHODS

/**
 * Reads a schema from a filename and returns an Object containing "name" and "schema" attributes
 * @param  {String} filename The filename of the schema to read
 * @return {Object}
 */
async function readSchema(filename) {

  const schema = await readFile(path.join(schemasPath, `yaml`, filename), `utf8`);

  return {
    name: filename.replace(`.yml`, ``),
    schema,
  };

}

/**
 * Writes a converted schema object to a JSON file in the /schemas/json folder
 * @param  {String}  name   The name of the schema
 * @param  {Object}  schema The schema as a JavaScript Object
 * @return {Promise}        Returns a Promise that resolves when complete
 */
async function writeSchema({ name, schema }) { // eslint-disable-line no-shadow
  await writeFile(`${name}.json`, JSON.stringify(schema, null, 2), `utf8`);
}

// TOP-LEVEL SCRIPT
void async function convert() {

  const filenames   = await readdir(path.join(schemasPath, `yaml`));
  const schemas = await Promise.all(filenames.map(readSchema));

  schemas.forEach(schema => {
    // eslint-disable-next-line no-param-reassign
    schema.schema = yamljs.parse(schema.schema);
  });


  await Promise.all(schemas.map(writeSchema));

}();

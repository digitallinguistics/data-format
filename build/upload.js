/**
 * Uploads latest and versioned copies of schemas to Azure Storage. Reads from the /yaml folder and converts to JSON, rather than reading from the JSON folder directly.
 */

/* eslint-disable
  no-console,
*/

// IMPORTS
require(`../../credentials/azure-storage-dlx`);

const path          = require(`path`);
const { promisify } = require(`util`);
const storage       = require(`azure-storage`).createBlobService();
const yamljs        = require(`yamljs`);

const {
  readdir,
  readFile,
} = require(`fs`).promises;

// PROMISES
const storeFile = promisify(storage.createBlockBlobFromText).bind(storage);

// VARIABLES
const jsonMedia = `application/schema+json; charset=utf-8`;
const yamlMedia = `text/yaml; charset=utf-8`;

const schemaNameRegExp = /schemas\/(?<schemaName>.+)-(?<version>.+).json/;
const schemasPath      = path.join(__dirname, `../schemas/yaml`);

// METHODS

/**
 * A Promisifed version of createBlockBlobFromText
 * @param  {String}  blobname                                               The name to upload the file as
 * @param  {String}  text                                                   The text of the file
 * @param  {String}  [contentType=`application/schema+json; charset=utf-8`] Content type (MIME / media type)
 * @return {Promise}
 */
function uploadBlob(blobname, text, contentType = jsonMedia) {
  return storeFile(
    `schemas`,
    blobname,
    text,
    {
      contentSettings: {
        contentLanguage: `en-US`,
        contentType,
      },
    }
  );
}

/**
 * Uploads the .json, unversioned, JSON version of the schema
 * @param  {String}       schemaName Name of the schema
 * @param  {String<JSON>} jsonSchema The schema as JSON text
 * @return {Promise}
 */
function uploadJSONUnversioned(schemaName, jsonSchema) {
  return uploadBlob(`${schemaName}.json`, jsonSchema);
}

/**
 * Uploades the .json, versioned, JSON version of the schema
 * @param  {String}         schemaName Name of the schema
 * @param  {String<JSON>}   jsonSchema The schema as JSON text
 * @param  {String<semver>} version    The version as a semver String
 * @return {Promise}
 */
function uploadJSONVersioned(schemaName, jsonSchema, version) {
  return uploadBlob(`${schemaName}-${version}.json`, jsonSchema);
}

/**
 * Uploads the no-extension, unversioned, JSON version of the schema
 * @param  {String}       schemaName Name of the schema
 * @param  {String<JSON>} jsonSchema The schema as JSON text
 * @return {Promise}
 */
function uploadPlainUnversioned(schemaName, jsonSchema) {
  return uploadBlob(schemaName, jsonSchema);
}

/**
 * Uploads the no-extension, versioned, JSON version of the schema
 * @param  {String}         schemaName Name of the schema
 * @param  {String<JSON>}   jsonSchema The schema as JSON text
 * @param  {String<semver>} version    The version as a semver String
 * @return {Promise}
 */
function uploadPlainVersioned(schemaName, jsonSchema, version) {
  return uploadBlob(`${schemaName}-${version}`, jsonSchema);
}

/**
 * Uploads the .yml, unversioned, YAML version of the schema
 * @param  {String}       schemaName Name of the schema
 * @param  {String<YAML>} yamlSchema The schema as YAML text
 * @return {Promise}
 */
function uploadYAMLUnversioned(schemaName, yamlSchema) {
  return uploadBlob(`${schemaName}.yml`, yamlSchema, yamlMedia);
}

/**
 * Uploads the .yml, versioned, YAML version of the schema
 * @param  {String}         schemaName Name of the schema
 * @param  {String<YAML>}   yamlSchema The schema as YAML text
 * @param  {String<semver>} version    The version as a semver String
 * @return {Promise}
 */
function uploadYAMLVersioned(schemaName, yamlSchema, version) {
  return uploadBlob(`${schemaName}-${version}.yml`, yamlSchema, version);
}

/**
 * Uploads each of the files associated with a single schema, based on the filename of the schema
 * @param  {String}  filename Filename of the schema (e.g. `Language.yml`)
 * @return {Promise}
 */
async function uploadSchemaFiles(filename) {

  const schemaPath = path.join(schemasPath, filename);
  const yamlSchema = await readFile(schemaPath, `utf8`); // YAML schema
  const schema     = yamljs.parse(yamlSchema);           // JS schema
  const jsonSchema = JSON.stringify(schema, null, 2);    // JSON schema

  const {
    schemaName,
    version,
  } = schemaNameRegExp.exec(schema.id).groups;

  await Promise.all([
    uploadPlainUnversioned(schemaName, jsonSchema),
    uploadPlainVersioned(schemaName, jsonSchema, version),
    uploadJSONUnversioned(schemaName, jsonSchema),
    uploadJSONVersioned(schemaName, jsonSchema, version),
    uploadYAMLUnversioned(schemaName, yamlSchema),
    uploadYAMLVersioned(schemaName, yamlSchema, version),
  ]);

  console.log(`${schemaName} schema uploaded`);

}

// TOP-LEVEL SCRIPT
void async function upload() {
  const filenames = await readdir(schemasPath, `utf8`);
  await Promise.all(filenames.map(uploadSchemaFiles));
}();

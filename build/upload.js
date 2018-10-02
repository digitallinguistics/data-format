/**
 * Uploads latest and versioned copies of schemas to Azure Storage. Reads from the /yaml folder and converts to JSON, rather than reading from the JSON folder directly.
 */

/* eslint-disable
  no-await-in-loop,
  no-console,
*/

// IMPORTS
require(`../../credentials/azure-storage-dlx`);

const chalk         = require(`chalk`);
const path          = require(`path`);
const { promisify } = require(`util`);
const semverRegExp  = require(`semver-regex`)();
const storage       = require(`azure-storage`).createBlobService();
const yamljs        = require(`yamljs`);

const {
  readdir,
  readFile,
} = require(`fs`).promises;

// PROMISES
const getBlobProperties = promisify(storage.getBlobProperties).bind(storage);
const storeFile         = promisify(storage.createBlockBlobFromText).bind(storage);

// VARIABLES
const jsonMedia = `application/schema+json; charset=utf-8`;
const yamlMedia = `text/yaml; charset=utf-8`;

const schemaNameRegExp = /schemas\/(?<schemaName>.+)-(?<version>.+).json/;
const schemasPath      = path.join(__dirname, `../schemas/yaml`);

// METHODS

/**
 * A Promisifed version of createBlockBlobFromText
 * @param  {String}  blobName                                               The name to upload the file as
 * @param  {String}  schema                                                 The text of the file
 * @param  {String}  [contentType=`application/schema+json; charset=utf-8`] Content type (MIME / media type)
 * @return {Promise}
 */
async function uploadBlob(blobName, schema, contentType = jsonMedia) {

  const hasVersion = semverRegExp.test(blobName);
  let blobProperties;

  // If file is versioned, check whether version already exists and throw a warning if it does
  if (hasVersion) {
    try {
      blobProperties = await getBlobProperties(`schemas`, blobName);
      console.warn(chalk.bgRed(`${blobName} already exists. Upload skipped.`));
    } catch (e) {
      // Don't handle exceptions; allow code to continue executing
    }
  }

  // Upload the file if its versioned form doesn't already exist
  if (!blobProperties) {

    await storeFile(
      `schemas`,
      blobName,
      schema,
      {
        contentSettings: {
          contentLanguage: `en-US`,
          contentType,
        },
      }
    );

    if (hasVersion) console.log(chalk.green(`${blobName} uploaded.`));

  }

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
    uploadBlob(schemaName, jsonSchema),                                // plain unversioned
    uploadBlob(`${schemaName}-${version}`, jsonSchema),                // plain versioned
    uploadBlob(`${schemaName}.json`, jsonSchema),                      // JSON unversioned
    uploadBlob(`${schemaName}-${version}.json`, jsonSchema),           // JSON versioned
    uploadBlob(`${schemaName}.yml`, yamlSchema, yamlMedia),            // YAML unversioned
    uploadBlob(`${schemaName}-${version}.yml`, yamlSchema, yamlMedia), // YAML versioned
  ]);

}

// TOP-LEVEL SCRIPT
void async function upload() {

  const filenames = await readdir(schemasPath, `utf8`);

  for (const filename of filenames) {
    await uploadSchemaFiles(filename);
  }

}();

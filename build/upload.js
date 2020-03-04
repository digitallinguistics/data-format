/**
 * Uploads latest and versioned copies of schemas to Azure Storage. Reads from the /yaml folder and converts to JSON, rather than reading from the JSON folder directly.
 */

/* eslint-disable
  no-await-in-loop,
*/

/* global
  process
*/

// IMPORTS & GLOBALS

if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error(`Please set the AZURE_STORAGE_CONNECTION_STRING variable.`);
}

import Azure              from 'azure-storage';
import chalk              from 'chalk';
import createSemverRegExp from 'semver-regex';
import { fileURLToPath }  from 'url';
import fs                 from 'fs';
import path               from 'path';
import { promisify }      from 'util';
import yamljs             from 'yamljs';

const {
  readdir: readDir,
  readFile,
} = fs.promises;

const currentDir   = path.dirname(fileURLToPath(import.meta.url));
const semverRegExp = createSemverRegExp();
const storage      = Azure.createBlobService();

// PROMISES
const getBlobProperties = promisify(storage.getBlobProperties).bind(storage);
const storeFile         = promisify(storage.createBlockBlobFromText).bind(storage);

// VARIABLES
const jsonMedia = `application/schema+json; charset=utf-8`;
const yamlMedia = `text/yaml; charset=utf-8`;

const schemaNameRegExp = /\.io\/(?<schemaName>.+)-(?<version>.+).json/u;
const schemasPath      = path.join(currentDir, `../schemas/yaml`);

// METHODS

/**
 * A Promisifed version of createBlockBlobFromText
 * @param {String} blobName                                               The name to upload the file as
 * @param {String} schema                                                 The text of the file
 * @param {String} [contentType=`application/schema+json; charset=utf-8`] Content type (MIME / media type)
 */
async function uploadBlob(blobName, schema, contentType = jsonMedia) {

  const hasVersion = semverRegExp.test(blobName);
  let blobProperties;

  // If file is versioned, check whether version already exists and throw a warning if it does
  if (hasVersion) {
    try {
      blobProperties = await getBlobProperties(`schemas`, blobName);
    } catch {
      console.warn(chalk.bgRed(`${blobName} already exists. Upload skipped.`));
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
      },
    );

    if (hasVersion) console.info(chalk.green(`${blobName} uploaded.`));

  }

}

/**
 * Uploads each of the files associated with a single schema, based on the filename of the schema
 * @param {String} filename Filename of the schema (e.g. `Language.yml`)
 */
async function uploadSchemaFiles(filename) {

  const schemaPath = path.join(schemasPath, filename);
  const yamlSchema = await readFile(schemaPath, `utf8`); // YAML schema
  const schema     = yamljs.parse(yamlSchema);           // JS schema
  const jsonSchema = JSON.stringify(schema, null, 2);    // JSON schema

  const {
    schemaName,
    version,
  } = schemaNameRegExp.exec(schema.$id).groups;

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

  const filenames = await readDir(schemasPath, `utf8`);

  for (const filename of filenames) {
    await uploadSchemaFiles(filename);
  }

}();

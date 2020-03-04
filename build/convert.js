// IMPORTS & GLOBALS

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';
import yamljs            from 'yamljs';

const {
  mkdirp:  createDir,
  readdir: readDir,
  readFile,
  remove:  removeDir,
  writeFile,
} = fs;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

// VARIABLES

const schemasDir = path.join(currentDir, `../schemas`);
const jsonDir    = path.join(schemasDir, `json`);
const yamlDir    = path.join(schemasDir, `yaml`);

// METHODS

/**
 * Create the index.js file for the /json directory
 */
async function generateIndex() {

  const fileNames   = await readDir(jsonDir);
  const schemaNames = fileNames.map(fileName => fileName.replace(`.json`, ``));

  const lines = schemaNames
  .map(schemaName => `  ${schemaName}: require('./${schemaName}'),`)
  .join(`\n`);

  const indexText = `module.exports = {\n${lines}\n};`;
  const indexPath = path.join(jsonDir, `index.js`);

  await writeFile(indexPath, indexText, `utf8`);

}

/**
 * Converts a single YAML schema to JSON
 * @param  {String} filename The name of a file in the /yaml directory
 */
async function convertSchema(filename) {
  const yaml         = await readFile(path.join(yamlDir, filename), `utf8`);
  const schema       = yamljs.parse(yaml);
  const json         = JSON.stringify(schema, null, 2);
  const jsonFileName = filename.replace(`.yml`, `.json`);
  const jsonFilePath = path.join(jsonDir, jsonFileName);
  await writeFile(jsonFilePath, json, `utf8`);
}

// TOP-LEVEL SCRIPT

/**
 * Converts each YAML schema in /schemas/yaml to a JSON file in /schemas/json
 * @return {Promise}
 */
void async function convert() {
  try {
    const filenames = await readDir(yamlDir);        // retrieve the list of YAML schemas to convert
    await removeDir(jsonDir);                        // remove the /json directory
    await createDir(jsonDir);                        // recreate the /json directory
    await Promise.all(filenames.map(convertSchema)); // convert all YAML schemas to JSON
    await generateIndex();                           // generate index.js for the JSON files
  } catch (e) {
    console.error(e);
  }
}();

// IMPORTS & GLOBALS

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import generateDocs      from 'jschemer';
import path              from 'path';

const {
  mkdirp: createDir,
  remove: removeDir,
  writeFile,
} = fs;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

// VARIABLES

/**
 * The contents of the CNAME file
 */
const CNAME = `format.digitallinguistics.io`;

/**
 * The path to the /docs folder
 */
const docsDir = path.join(currentDir, `../docs`);

/**
 * The options passed to jschemer
 */
const jschemerOptions = {
  out:     path.join(currentDir, `../docs`),
  readme:  path.join(currentDir, `../.github/README.md`),
  schemas: path.join(currentDir, `../schemas/json`),
};

// METHODS

/**
 * Generates the CNAME file used for GitHub pages in the /docs folder
 * @return {Promise}
 */
async function generateCNAME() {
  const cnamePath = path.join(docsDir, `CNAME`);
  await writeFile(cnamePath, CNAME, `utf8`);
}

// TOP-LEVEL SCRIPT

/**
 * Builds the project documentation in the /docs folder
 * - deletes the /docs folder and recreates it
 * - generates the jschemer documentation inside the /docs folder
 * - adds the CNAME file (for GitHub pages) inside the /docs folder
 * @return {Promise}
 */
void async function buildDocs() {
  await removeDir(docsDir);
  await createDir(docsDir);
  await generateDocs(jschemerOptions);
  await generateCNAME();
}();

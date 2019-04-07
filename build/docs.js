// IMPORTS

const generateDocs = require(`jschemer`);
const path         = require(`path`);

const {
  mkdirp: createDir,
  remove: removeDir,
  writeFile,
} = require(`fs-extra`);

// VARIABLES

/**
 * The contents of the CNAME file
 */
const CNAME = `format.digitallinguistics.io`;

/**
 * The path to the /docs folder
 */
const docsDir = path.join(__dirname, `../docs`);

/**
 * The options passed to jschemer
 */
const jschemerOptions = {
  out:     path.join(__dirname, `../docs`),
  readme:  path.join(__dirname, `../.github/README.md`),
  schemas: path.join(__dirname, `../schemas/json`),
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
async function buildDocs() {
  await removeDir(docsDir);
  await createDir(docsDir);
  await generateDocs(jschemerOptions);
  await generateCNAME();
}

// EXPORTS

// Run this script if called directly from the command line
if (require.main === module) buildDocs();

// Export the buildDocs function if called from another script
else module.exports = buildDocs;

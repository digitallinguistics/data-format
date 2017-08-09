/* eslint-disable
  func-names,
  no-console,
  no-extra-parens,
*/

require('../../credentials/azure-storage');

const path    = require('path');
const schemas = require('../schemas');
const storage = require('azure-storage').createBlobService();
const util    = require('util');

const contentSettings = {
  contentEncoding: `utf8`,
  contentType:     `applicaton/json`,
};

const storeFile = (filename, text) => util.promisify(storage.createBlockBlobFromText).bind(storage)(`schemas`, filename, text, { contentSettings });

const upload = async schema => {
  const versionedFilename = path.parse(schema.id).base;
  const versionedText     = JSON.stringify(schema, null, 2);
  await storeFile(versionedFilename, versionedText);
  const latestFilename    = path.parse(schema.id).base.replace(/-.+(\.json)$/, `$1`);
  const lastestText       = JSON.stringify(schema, null, 2);
  await storeFile(latestFilename, lastestText);
  console.log(`${latestFilename} uploaded.`);
};

(async function() {
  await Promise.all(Object.values(schemas).map(upload));
  console.log(`All schemas uploaded.`);
}());

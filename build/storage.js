require('../../credentials/dlx-spec');

const path      = require('path');
const schemas = require('../schemas');
const storage = require('azure-storage').createBlobService();

const contentSetings = {
  contentEncoding: 'utf8',
  contentType:     'applicaton/json',
};

const uploadLatestFile = schema => new Promise((resolve, reject) => {

  const filename = path.parse(schema.id).base.replace(/-.+(\.json)$/, '$1');
  const text     = JSON.stringify(schema, null, 2);

  storage.createBlockBlobFromText('schemas', filename, text, { contentSetings }, err => {
    if (err) reject(err);
    else resolve();
  });

});

const uploadVersionedFile = schema => new Promise((resolve, reject) => {

  const filename = path.parse(schema.id).base;
  const text     = JSON.stringify(schema, null, 2);

  storage.createBlockBlobFromText('schemas', filename, text, { contentSetings }, err => {
    if (err) reject(err);
    else resolve();
  });

});

Promise.all(
  Object.keys(schemas)
  .map(
    schema => uploadVersionedFile(schemas[schema])
    .then(() => uploadLatestFile(schemas[schema]))
    .then(() => console.log(`"${schema}" schema uploaded.`))
  )
).then(() => console.log('All schemas uploaded.'))
.catch(console.error);

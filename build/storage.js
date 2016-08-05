const fs = require('fs');
const path = require('path');
const Storage = require('azure-storage');

if (process.env.NODE_ENV === 'local') {
  require('../../credentials/dlx-spec');
}

const blobList = [];
const storage = Storage.createBlobService();

const getBlobList = (continuationToken) => new Promise(resolve => {
  storage.listBlobsSegmented('schemas', null, (err, res) => {

    if (err) {
      console.error(err, err.stack);
      throw new Error('Unable to list blobs');
    }

    blobList.push(...res.entries.map(entry => entry.name));

    if (res.continuationToken) {
      getBlobList(res.continuationToken);
    } else {
      resolve();
    }

  });
});

const getFileList = () => new Promise((resolve, reject) => {
  // TODO: read /schemas directory with fs.readDir()
});

const readSchema = filename => new Promise((resolve, reject) => {

  const filepath = path.join(__dirname, '../schemas', filename);

  fs.readFile(filepath, 'utf8', (err, text) => {
    if (err) { reject(err); }
    resolve(text);
  });

});

// TODO: listen for errors in promises, and throw the error with iterator.throw
// TODO: add runGenerator() to your utilities.js file
const runGenerator = (generator, generatorArgs) => {

  const args = Array.isArray(generatorArgs) ? generatorArgs : [generatorArgs];
  const iterator = generator(...args);
  let result;

  (function iterate(val) {

    result = iterator.next(val);

    if (!result.done) {
      if (result.value instanceof Promise) {
        result.value.then(iterate);
      } else {
        setTimeout(() => { iterate(result.value); }, 0);
      }
    }

  }());

};

const updateSchema = filename => new Promise((resolve, reject) => {
  // TODO: use a try-catch to handle errors
  runGenerator(function* update() {
    const text = yield readSchema(filename);
    const schema = JSON.parse(text);
    const blobName = schema.id.match(/\/schemas\/([^/]+\.json)/)[1];
    const blobExists = blobList.includes(blobName);

    if (blobExists) {
      console.log(`Schema ${blobName} up to date.`);
    } else if (!blobExists) {
      yield uploadVersionedSchema(blobName, filepath, schema);
      yield uploadLatestSchema(blobName, filepath, schema);
    }

  }, [filename]);
});

// TODO: this needs to be split into two functions:
// - uploadVersionedSchema
// - uploadLatestSchema
/*
const uploadSchema = (blobName, filepath, schema) => new Promise((resolve, reject) => {

  const metadata = { version: blobName.match(/-().json/)[1] };
  console.log(metadata);

  storage.createBlockBlobFromLocalFile('schemas', blobName, filepath);
});
*/

runGenerator(function* main() {
  const fileList = yield getFileList();

  yield getBlobList();
  yield Promise.all(fileList.map(updateSchema))
    .then(() => console.log(`All schemas successfully updated.`))
    .catch(err => {
      console.error(`There was an error updating the schemas.`);
      console.error(err, err.stack);
    });
});

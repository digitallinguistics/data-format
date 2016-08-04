/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const Storage = require('azure-storage'); // Azure Storage SDK

// Add Azure credentials to environment variable when testing locally
if (process.env.NODE_ENV === 'local') {
  require('../../credentials/dlx-spec');
}

const storage = Storage.createBlobService(); // create the Blob Service

const readSchema = filename => new Promise((resolve, reject) => {

  const filepath = path.join(__dirname, '../schemas', filename);

  fs.readFile(filepath, 'utf8', (err, text) => {
    if (err) { reject(err); }
    resolve(text);
  });

});

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

const uploadSchema = function* uploadSchema(filename) {
  const text = yield readSchema(filename);
  const schema = JSON.parse(text);
};

runGenerator(uploadSchema, ['abbreviation.json']);

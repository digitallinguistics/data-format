/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const runGenerator = require('./runGenerator');
const AzureStorage = require('azure-storage');

// remember to set the environment variable to 'local' when testing
if (process.env.NODE_ENV === 'local') {
  require('../../credentials/dlx-spec');
}

const blobList = [];
const storage = AzureStorage.createBlobService();
const uploadedStatus = 201;

const logError = err => console.error(err, err.stack);

runGenerator(function* main() {

  const getBlobList = continuationToken => new Promise(resolve => {
    storage.listBlobsSegmented('schemas', continuationToken, (err, res) => {

      if (err) {
        logError(err);
        throw new Error('Unable to list blobs');
      }

      const blobNames = res.entries.map(entry => entry.name);
      blobList.push(...blobNames);

      if (res.continuationToken) {
        getBlobList(res.continuationToken);
      }

      resolve();

    });
  });

  const getFileList = () => new Promise(resolve => {
    const filepath = path.join(__dirname, '../schemas');

    fs.readdir(filepath, 'utf8', (err, filenames) => {
      if (err) {
        logError(err);
        throw new Error('Unable to list files in /schemas folder.');
      }
      resolve(filenames);
    });
  });

  const readSchema = filename => new Promise((resolve, reject) => {

    const filepath = path.join(__dirname, '../schemas', filename);

    fs.readFile(filepath, 'utf8', (err, text) => {
      if (err) {
        console.error(`Unable to read schema from ${filename}`);
        reject(err);
      }
      resolve(text);
    });

  });

  const updateSchema = filename => new Promise((resolve, reject) => {
    runGenerator(function* update() {

      let text;

      try {
        text = yield readSchema(filename).catch(logError);
      } catch (err) {
        console.error(`Error reading schema: ${filename}.`);
        reject(err);
      }

      const schema = JSON.parse(text);
      const versionedBlobNameRegExp = /\/schemas\/([^/]+\.json)/;
      const versionedBlobName = schema.id.match(versionedBlobNameRegExp)[1];
      const latestBlobName = filename.replace('.json', '-latest.json');
      const blobExists = blobList.includes(versionedBlobName);

      if (blobExists) {
        console.log(`Schema ${versionedBlobName} up to date.`);
      } else if (!blobExists) {

        const versionRegExp = /-([^/]+)\.json/;
        const schemaVersion = schema.id.match(versionRegExp)[1];

        const blobStorageOpts = {
          metadata: {
            version: schemaVersion,
          },
          contentSettings: {
            contentType:     'application/json',
            contentEncoding: 'utf8',
          },
        };

        try {
          yield uploadSchema(versionedBlobName, blobStorageOpts, text).catch(logError);
          yield uploadSchema(latestBlobName, blobStorageOpts, text).catch(logError);
        } catch (err) {
          console.error(`Error updating schema: ${filename}.`);
          reject(err);
        }

      }

    }, [filename]).catch(logError);
  });

  const uploadSchema = (blobName, opts, text) => new Promise((resolve, reject) => {
    storage.createBlockBlobFromText('schemas', blobName, text, opts, (err, res, headers) => {

      if (err) {
        console.error(`Unable to upload schema for ${blobName}.`);
        reject(err);
      } else if (headers.statusCode != uploadedStatus) {
        throw new Error(`Issue uploading schema for ${blobName}.`);
      }

      resolve();

    });
  });

  const fileList = yield getFileList().catch(logError);

  yield getBlobList().catch(logError);

  yield Promise.all(fileList.map(updateSchema))
    .then(() => console.log(`All schemas successfully updated.`))
    .catch(err => {
      console.error(`There was an error updating the schemas.`);
      logError(err);
    });

}).catch(logError);

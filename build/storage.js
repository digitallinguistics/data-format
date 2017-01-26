/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const runGenerator = require('./runGenerator');
const AzureStorage = require('azure-storage');

// NB: remember to set the environment variable to 'local' when testing locally
if (process.env.NODE_ENV === 'local') {
  // loads Azure Storage connection string when testing locally
  // AZURE_STORAGE_CONNECTION_STRING is then used by AzureStorage.createBlobService()
  require('../../credentials/dlx-spec');
}

const blobList = [];
const storage = AzureStorage.createBlobService();
const uploadedStatus = 201;

/**
 * Generic error logging function for use in callbacks
 * @param  {Object} err The error Object
 * @return {void} No return
 */
const logError = err => console.error(err, err.stack);

runGenerator(function* main() {

  /**
   * Retrieves the list of blobs in the 'schemas' container from Azure storage
   * and stores the list in the `blobList` variable
   * @param {String} continuationToken The continuation token, if any was returned
   * @return {Promise} Resolves when complete
   */
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

  /**
   * Reads the /schemas directory and returns the list of filenames
   * @return {Promise} filenames    Resolves to the list of filenames
   */
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

  /**
   * Reads an individual schema file returns the raw text as a string
   * @param {String} filename The filename to read within the /schemas directory
   * @return {Promise} Resolves to a string representation of the schema
   */
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

  /**
   * Parses the text schema, and uploads both the latest and versioned copies to Azure
   * @param {String} filename     The name of the file to update within the /schemas directory
   * @return {Promise} Resolves when complete
   */
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

        /**
         * The metadata and content settings for the blob
         * @type {Object}
         */
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

        resolve();

      }

    }, [filename]).catch(logError);
  });

  /**
   * Uploads a schema to Azure Blob storage
   * @param  {String} blobName The blob name
   * @param  {Object} opts     The metadata and content settings for the blobName
   *                           {@link blobStorageOpts}
   * @param  {String} text     The text of the schema to upload
   * @return {Promise}         Resolves when complete
   */
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

  // Get the list of files in the /schemas directory
  const fileList = yield getFileList().catch(logError);

  // Get the list of blobs from the 'schemas' container in Azure Blob Storage
  yield getBlobList().catch(logError);

  // Run updateSchema() for each of the files in the /schemas directory
  yield Promise.all(fileList.map(updateSchema))
    .then(() => console.log(`All schemas successfully updated.`))
    .catch(err => {
      console.error(`There was an error updating the schemas.`);
      logError(err);
    });

}).catch(logError);

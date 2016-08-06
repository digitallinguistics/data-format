require('../credentials/dlx-spec');
const AzureStorage = require('azure-storage');
const fs = require('fs');
const path = require('path');

const storage = AzureStorage.createBlobService();

const file = `${process.argv[3]}.json`;
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, `/schemas/${file}`), 'utf8'));
const versionedFile = schema.id.match(/\/schemas\/([^/]+\.json)/)[1];
const latestFile = versionedFile.replace(/-[^/]+\.json/, '-latest.json');

if (process.argv.includes('get')) {

  storage.getBlobMetadata('schemas', versionedFile, (err, res) => {

    if (err) {
      throw new Error(err);
    }

    console.log(res);

    storage.getBlobMetadata('schemas', latestFile, (err, res) => {

      if (err) {
        throw new Error(err);
      }

      console.log(res);

      storage.getBlobProperties('schemas', versionedFile, (err, res) => {

        if (err) {
          throw new Error(err);
        }

        console.log(res);

      });

    });

  });

} else if (process.argv.includes('update')) {

  const metadata = {
    version: versionedFile.match(/-([^/]+)\.json/)[1],
  };

  const properties = {
    contentType:     'application/json',
    contentEncoding: 'utf8',
  };

  storage.setBlobMetadata('schemas', versionedFile, metadata, err => {

    if (err) {
      throw new Error(err);
    } else {

      console.log('.');

      storage.setBlobProperties('schemas', versionedFile, properties, err => {

        if (err) {
          throw new Error(err);
        }

        console.log('.');

        storage.setBlobMetadata('schemas', latestFile, metadata, err => {

          if (err) {
            throw new Error(err);
          }

          console.log('.');

          storage.setBlobProperties('schemas', latestFile, properties, err => {

            if (err) {
              throw new Error(err);
            }

            console.log(`${file} uploaded`);

          });

        });

      });

    }

  });

}

const Storage = require('azure-storage');
require('../../credentials/dlx-spec');

const storage = Storage.createBlobService();

// Stores a file in Azure Blob Storage by running the following command:
// `node build/storage.js store abbreviation.json`
// This will parse the file `abbreviation.json` in the `/schemas` folder,
//   read the version number from the `id` field of the schema,
//   and upload a new blob whose filename includes the version number.

if (process.argv[2] === 'store') {

  const schema = require(`../schemas/${process.argv[3]}`);
  const filename = schema.id.match(/\/schemas\/([^/]+\.json)/)[1];
  const text = JSON.stringify(schema, null, 2);

  const opts = {
    contentEncoding: 'utf-8',
    contentType: 'application/schema+json'
  };

  storage.createBlockBlobFromText('schemas', filename, text, opts, err => {
    if (err) { console.error(err); }
    else {

      console.log('Current version stored successfully.');

      const filename = process.argv[3].replace(/\.json$/, '-latest.json');

      storage.createBlockBlobFromText('schemas', filename, text, opts, err => {
        if (err) { console.error(err); }
        else { console.log('Latest version stored successfully.'); }
      });

    }
  });

}

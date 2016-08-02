require('../../credentials/dlx-spec');
const Storage = require('azure-storage');
const storage = Storage.createBlobService();

storage.getServiceProperties((err, res) => {

  const Storage = require('azure-storage');
  const storage = Storage.createBlobService();

  storage.getServiceProperties((err, res) => {

    res.Cors.CorsRule = [
      {
        AllowedOrigins: ['*'],
        AllowedMethods: ['GET'],
        AllowedHeaders: [],
        ExposedHeaders: [],
        MaxAgeInSeconds: 500
      }
    ];

    storage.setServiceProperties(res, (err, res) => {
      console.log(err || res);
    });

  });

});

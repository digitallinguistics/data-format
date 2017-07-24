/* eslint-disable
  guard-for-in
*/

const AJV = require('ajv');
const schemas = require('../schemas');

const ajv = new AJV();

Object.values(schemas).forEach(schema => {
  const id = schema.id.replace(/-(.+)(\.json)/, `$2`);
  ajv.addSchema(schema, id);
});

module.exports = ajv;

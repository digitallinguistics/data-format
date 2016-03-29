const fs = require('fs');
const http = require('http');
const tv4 = require('tv4');

describe('schemas', function () {

  beforeAll(function (done) {

    this.schemas = {};
    fs.readdirSync('schemas').map(schema => this.schemas[schema] = JSON.parse(fs.readFileSync(`schemas/${schema}`, { encoding: 'utf8' })));

    tv4.addSchema('http://json-schema.org/schema');

    http.get('http://json-schema.org/schema', res => {
      var data = '';
      res.on('data', chunk => data += chunk);
      res.on('error', err => console.error(err));
      res.on('end', () => {
        this.jsonSchema = JSON.parse(data);
        done();
      });
    });

  });

  it('are valid schemas', function () {

    for (var schema in this.schemas) {
      console.log(`${schema}: ${tv4.validate(this.schemas[schema], this.jsonSchema)}`);
      expect(tv4.validate(this.schemas[schema], this.jsonSchema)).toBe(true);
      if (tv4.error) { console.log(tv4.error); }
    }

  });

});

const fs = require('fs');
const hbs = require('handlebars');
const markdown = require('markdown').markdown;

const preprocess = schema => {
  schema = JSON.parse(JSON.stringify(schema));
  for (var prop in schema) {

    if (prop === 'patternProperties') {
      for (var patt in schema.patternProperties) {
        schema.patternProperties[patt].pattern = patt;
      }
    } else if (prop === 'type') {
      schema.type = Array.isArray(schema.type) ? schema.type : [schema.type];
    } else if (prop === 'properties') {
      for (var key in schema.properties) {
        schema.properties[key].title = schema.properties[key].title || key;
        schema.properties[key] = preprocess(schema.properties[key]);
      }
    }

    if (typeof schema[prop] === 'boolean') {
      schema[prop] = { boolean: schema[prop] };
    } else if (schema[prop] instanceof Object) {
      schema.object = true;
    }

  }
  return schema;
};

/**
 * The JSchemer object.
 * @type {Object}
 * @param config                                      A config hash.
 * @param {String} config.template=./template.hbs     The path to the JSchemer Handlebars template. Defaults to <code>./template.hbs</code>.
 */
module.exports = config => {

  const template = fs.readFileSync(config.template || './schema.hbs', 'utf8');
  const converter = hbs.compile(template);

  hbs.registerPartial('schema', template);
  hbs.registerHelper('md', function (text) {
    const html = markdown.toHTML(text).replace(/^<p>/, '').replace(/<\/p>$/, '');
    return new hbs.SafeString(html);
  });

  return {
    convert: jschema => {
      jschema = preprocess(jschema);
      jschema = typeof jschema === 'string' ? converter(JSON.parse(jschema)) : converter(jschema);
      return jschema;
    }
  };
};

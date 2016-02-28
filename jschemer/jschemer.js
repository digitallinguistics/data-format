const fs = require('fs');
const hbs = require('handlebars');

const preprocess = obj => {
  obj = JSON.parse(JSON.stringify(obj));
  for (var prop in obj) {

    if (obj[prop] === true || obj[prop] === false) {
      obj[prop] = { boolean: obj[prop] };
    } else if (obj[prop] instanceof Array) {
      obj[prop].forEach(preprocess);
    } else if (obj[prop] instanceof Object) {
      obj.object = true;
      preprocess(obj[prop]);
    }

  }
  return obj;
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

  return {
    convert: jschema => {
      jschema = preprocess(jschema);
      jschema = typeof jschema === 'string' ? converter(JSON.parse(jschema)) : converter(jschema);
      return jschema;
    }
  };
};

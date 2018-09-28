/* eslint-disable
  guard-for-in,
  no-await-in-loop,
*/

const path          = require(`path`);
const schemas       = require(`./schemas/json`);
const { writeFile } = require(`fs`).promises;
const yamljs        = require(`yamljs`);

const YAMLPath = path.join(__dirname, `./schemas/yaml`);

void async function convert() {

  for (const schema in schemas) {
    const yaml = yamljs.stringify(schemas[schema], 10, 2);
    await writeFile(path.join(YAMLPath, `${schema}.yml`), yaml, `utf8`);
  }

}();

import { fileURLToPath }      from 'url';
import path                   from 'path';
import { readdir as readDir } from 'fs';
import yamljs                 from 'yamljs';

const currentDir  = path.dirname(fileURLToPath(import.meta.url));
const schemasPath = path.join(currentDir, `../../schemas/yaml`);

let schemas;

/**
 * Retrieves the schemas from /schemas/yaml, converts them to JSON, and returns a Map of the schemas. This function is a singleton: the schemas are only loaded once.
 */
async function getSchemas() {

  if (schemas) return schemas;

  const IDRegExp  = /\.io\/(?<schemaID>.+)-/u;
  const filenames = await readDir(schemasPath, `utf8`);

  schemas = filenames // eslint-disable-line require-atomic-updates
  .map(filename => yamljs.load(path.join(schemasPath, filename)))
  .reduce((map, schema) => {
    const { schemaID } = IDRegExp.exec(schema.$id).groups;
    map.set(schemaID, schema);
    return map;
  }, new Map);

  return schemas;

}

export default getSchemas;

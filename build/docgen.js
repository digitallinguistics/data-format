// generates the documentation pages
// simply run `node build/docgen.js`
const fs = require('fs');
const jschemer = require('jschemer')();

const filenames = fs.readdirSync('schemas');

filenames.forEach(filename => {
  if (filename.endsWith('.json')) {
    const schema = require(`../schemas/${filename}`);
    const html = jschemer.convert(schema);
    fs.writeFileSync(filename.replace('.json', '.html'), html, 'utf8');
  }
});

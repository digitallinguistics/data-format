// generates the documentation pages
// simply run `node build/docgen.js`
const fs = require('fs');
const jschemer = require('jschemer')();

const filenames = fs.readdirSync('schemas');

filenames.forEach(filename => {
  if (filename.endsWith('.json')) {

    const schema = require(`../schemas/${filename}`);

    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${filename.charAt(0).toUpperCase() + filename.slice(1)}</title>
        <link rel=stylesheet href=http://digitallinguistics.org/css/reset.css charset=utf-8>
        <link rel=stylesheet href=build/jschemer.css charset=utf-8>
      </head>
      <body>
        ${jschemer.convert(schema)}
      </body>
    </html>`;

    fs.writeFileSync(filename.replace('.json', '.html'), html, 'utf8');

  }
});

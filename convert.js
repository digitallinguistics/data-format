const fs = require('fs');

const jschemer = require('./jschemer/jschemer')({
  template: './jschemer/schema.hbs'
});

const textSchema = require('./spec/text');
const lexiconSchema = require('./spec/text');

const textHtml = jschemer.convert(textSchema);
const lexiconHtml = jschemer.convert(lexiconSchema);

fs.writeFileSync('html/text.html', textHtml);
fs.writeFileSync('html/lexicon.html', lexiconHtml);

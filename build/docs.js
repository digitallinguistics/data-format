import build from 'wetzel'

import Abbreviation from '../json/Abbreviation.json' assert { type: 'json' }

const markdown = await build({
  schema: Abbreviation
})

console.log(markdown);
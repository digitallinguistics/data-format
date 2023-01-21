import { expect }        from 'chai'
import { fileURLToPath } from 'url'
import path              from 'path'
import { readFile }      from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const yearRegExp = /2013\u2013(?<year>\d{4})/u

describe(`LICENSE`, function() {

  it(`has the correct year`, async function() {
    const licensePath = path.join(__dirname, `./LICENSE.md`)
    const text        = await readFile(licensePath, `utf8`)
    const { year }    = yearRegExp.exec(text).groups
    const currentYear = new Date().getFullYear().toString()
    expect(year).to.equal(currentYear)
  })

})

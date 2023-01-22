import { fileURLToPath } from 'node:url'
import path              from 'node:path'
import yamlParser        from 'js-yaml'

import {
  readdir as readDir,
  readFile,
} from 'node:fs/promises'

import {
  copy,
  emptyDir,
  outputJSON,
} from 'fs-extra/esm'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const yamlPath   = path.join(__dirname, `../schemas`)
const files      = await readDir(yamlPath)
const jsonPath   = path.join(__dirname, `../json`)

await emptyDir(jsonPath)

for (const file of files) {

  const ext        = path.extname(file)
  const inputPath  = path.join(yamlPath, file)
  const name       = path.basename(file, ext)
  const outputPath = path.join(jsonPath, `${ name }.json`)

  if (ext === `.json`) {
    await copy(inputPath, outputPath)
    continue
  }

  const yaml = await readFile(inputPath, `utf8`)
  const data = yamlParser.load(yaml)

  await outputJSON(outputPath, data, { spaces: 2 })

}

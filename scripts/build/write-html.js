import pify from 'pify'
import fs from 'fs-extra'
import path from 'path'

export default function writeHtmlFile (html, filename) {
  const filepath = path.join('www', filename)
  return pify(fs.outputFile)(filepath)
    .then(() => `${filename} file created (${(html.length / 1024).toFixed()} KB)`)
}

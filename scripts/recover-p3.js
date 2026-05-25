import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const bundle = fs.readFileSync(
  path.join(__dirname, '..', 'quiz-app', 'dist', 'assets', 'index-BdnfVwgI.js'),
  'utf8',
)

// Old flat p3 questions embedded in bundle
const start = bundle.indexOf('[{id:"3.1"')
const alt = bundle.indexOf('[{"id":"3.1"')
const idx = start !== -1 ? start : alt
if (idx === -1) {
  console.error('Could not find p3 questions in bundle')
  process.exit(1)
}

let depth = 0
let inStr = false
let esc = false
let end = idx
for (let i = idx; i < bundle.length; i++) {
  const c = bundle[i]
  if (inStr) {
    if (esc) esc = false
    else if (c === '\\') esc = true
    else if (c === '"') inStr = false
  } else {
    if (c === '"') inStr = true
    else if (c === '[') depth++
    else if (c === ']') {
      depth--
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }
}

const jsonStr = bundle.slice(idx, end)
const flatQuestions = JSON.parse(jsonStr)
console.log('Recovered', flatQuestions.length, 'flat questions')
fs.writeFileSync(
  path.join(__dirname, '..', 'p3-flat-questions.json'),
  JSON.stringify(flatQuestions, null, 2),
)

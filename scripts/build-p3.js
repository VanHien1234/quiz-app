import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { READING_PASSAGES } from './reading-passages.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const bundle = fs.readFileSync(
  path.join(__dirname, '..', 'quiz-app', 'dist', 'assets', 'index-BdnfVwgI.js'),
  'utf8',
)

const idx = bundle.indexOf('[{"id":"3.1"')
if (idx === -1) {
  console.error('Bundle questions not found')
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

// Bundle uses \\" inside strings — normalize for JSON.parse
const jsonStr = bundle
  .slice(idx, end)
  .replace(/\\\\/g, '\u0001')
  .replace(/\\"/g, '"')
  .replace(/\u0001/g, '\\')

const flatQuestions = JSON.parse(jsonStr)
console.log('Loaded', flatQuestions.length, 'questions')

const ranges = [
  [1, 10],
  [11, 20],
  [21, 30],
  [31, 40],
  [41, 50],
  [51, 60],
  [61, 70],
]

const passages = READING_PASSAGES.map((passage, i) => {
  const [start, endNum] = ranges[i]
  const questions = flatQuestions.filter((q) => {
    const num = parseInt(q.id.split('.')[1], 10)
    return num >= start && num <= endNum
  })
  return {
    title: passage.title,
    readingContent: passage.content,
    questions,
  }
})

const outPath = path.join(
  __dirname,
  '..',
  'quiz-app',
  'data',
  'anhVanDauVao2026',
  'p3.json',
)
fs.writeFileSync(outPath, JSON.stringify(passages, null, 2) + '\n', 'utf8')
JSON.parse(fs.readFileSync(outPath, 'utf8'))
console.log('Wrote', outPath, 'with', passages.length, 'passages')

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputPath = path.join(
  __dirname,
  '..',
  'quiz-app',
  'data',
  'anhVanDauVao2026',
  'p3.json',
)
const outputPath = inputPath

if (!fs.existsSync(inputPath)) {
  console.error('p3.json not found')
  process.exit(1)
}

let raw = fs.readFileSync(inputPath, 'utf8')

// Already valid passage structure with formatted readingContent
try {
  const data = JSON.parse(raw)
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    data[0].readingContent &&
    !data[0].readingContent.includes('`') &&
    data[0].readingContent.includes('\n\n')
  ) {
    console.log('p3.json already formatted, skipping')
    process.exit(0)
  }
} catch {
  /* continue to fix */
}

// Remove full-line // comments (keep URLs etc. out — none here)
raw = raw
  .split('\n')
  .filter((line) => !/^\s*\/\//.test(line))
  .join('\n')

function formatReadingText(text) {
  let t = text.trim()
  // Remove markdown backticks wrapping
  if (t.startsWith('`')) t = t.slice(1)
  if (t.endsWith('`')) t = t.slice(0, -1)
  t = t.trim()
  // Remove stray escaped quotes at ends
  t = t.replace(/^\\?"|\\?"$/g, '').trim()

  // Normalize line endings
  t = t.replace(/\r\n/g, '\n')

  // Split into paragraphs (blank line between blocks)
  const blocks = t.split(/\n\s*\n/).map((block) =>
    block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim(),
  )

  return blocks.filter(Boolean).join('\n\n')
}

function extractPassages(text) {
  const passages = []
  const passageRegex =
    /\{\s*"title"\s*:\s*"([^"]+)"\s*,\s*"readingContent"\s*:\s*"([\s\S]*?)"\s*,\s*"questions"\s*:\s*\[/g

  let match
  while ((match = passageRegex.exec(text)) !== null) {
    passages.push({
      title: match[1].trim(),
      readingContentRaw: match[2],
      startIndex: match.index,
      questionsStart: match.index + match[0].length,
    })
  }
  return passages
}

// Fallback: split by PASSAGE title markers if regex fails on broken JSON
function extractPassagesFallback(text) {
  const parts = text.split(/\{\s*"title"\s*:\s*"/)
  const passages = []
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i]
    const titleEnd = chunk.indexOf('"')
    const title = chunk.slice(0, titleEnd)
    const rest = chunk.slice(titleEnd + 1)
    const rcMarker = '"readingContent":"'
    const qMarker = ',"questions":['
    const rcStart = rest.indexOf(rcMarker)
    const qStart = rest.indexOf(qMarker)
    if (rcStart === -1 || qStart === -1) continue
    const readingContentRaw = rest.slice(rcStart + rcMarker.length, qStart)
    const questionsPart = rest.slice(qStart + qMarker.length)
    passages.push({ title, readingContentRaw, questionsPart })
  }
  return passages
}

function extractQuestionsJson(questionsPart, passageIndex, allParts) {
  // questionsPart runs until next passage or end of array
  let depth = 1
  let i = 0
  let inString = false
  let escape = false
  while (i < questionsPart.length && depth > 0) {
    const c = questionsPart[i]
    if (inString) {
      if (escape) escape = false
      else if (c === '\\') escape = true
      else if (c === '"') inString = false
    } else {
      if (c === '"') inString = true
      else if (c === '[') depth++
      else if (c === ']') {
        depth--
        if (depth === 0) break
      }
    }
    i++
  }
  const questionsJson = questionsPart.slice(0, i + 1)
  return JSON.parse(questionsJson)
}

const fallbackPassages = extractPassagesFallback(raw)
if (fallbackPassages.length === 0) {
  const parts = raw.split(/\{\s*"title"\s*:\s*"/)
  console.error('Split parts:', parts.length, 'sample:', parts[1]?.slice(0, 120))
}
const rebuilt = fallbackPassages.map((p) => ({
  title: p.title,
  readingContent: formatReadingText(p.readingContentRaw),
  questions: extractQuestionsJson(p.questionsPart),
}))

fs.writeFileSync(outputPath, JSON.stringify(rebuilt, null, 2) + '\n', 'utf8')

console.log(`Fixed ${rebuilt.length} passages`)
rebuilt.forEach((p) => {
  console.log(
    `  ${p.title}: ${p.readingContent.length} chars, ${p.questions.length} questions`,
  )
})

// Validate
JSON.parse(fs.readFileSync(outputPath, 'utf8'))
console.log('JSON is valid')

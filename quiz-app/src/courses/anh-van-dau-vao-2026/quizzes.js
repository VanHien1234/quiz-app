import p1 from '../../../data/anhVanDauVao2026/p1.json'
import p2 from '../../../data/anhVanDauVao2026/p2.json'
import p3Passages from '../../../data/anhVanDauVao2026/p3.json'

const p3Parts = p3Passages.map((passage, index) => ({
  id: `p3-passage-${index + 1}`,
  part: '3',
  title: `Phần 3 — ${passage.title.trim()}`,
  description: 'Đọc đoạn văn và trả lời câu hỏi',
  file: 'data/anhVanDauVao2026/p3.json',
  readingContent: passage.readingContent,
  questions: passage.questions,
}))

export const QUIZ_PARTS = [
  {
    id: 'p1',
    part: '1',
    title: 'Phần 1 — Cấu trúc câu',
    description: 'Điền từ / chọn cấu trúc ngữ pháp đúng',
    file: 'data/anhVanDauVao2026/p1.json',
    questions: p1,
  },
  {
    id: 'p2',
    part: '2',
    title: 'Phần 2 — Tìm lỗi sai',
    description: 'Xác định (A)(B)(C)(D) có lỗi trong câu',
    file: 'data/anhVanDauVao2026/p2.json',
    questions: p2,
  },
  ...p3Parts,
]

export function getCorrectAnswer(question) {
  return question.correctAnwser
}

export function isCorrectAnswer(question, selected) {
  if (!selected) return false
  return selected === getCorrectAnswer(question)
}

export function shuffleArray(array) {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

export function generateFullTest() {
  const p1Shuffled = shuffleArray(p1).slice(0, 15).map(q => ({
    ...q,
    partTitle: 'Phần 1 — Cấu trúc câu'
  }))
  
  const p2Shuffled = shuffleArray(p2).slice(0, 25).map(q => ({
    ...q,
    partTitle: 'Phần 2 — Tìm lỗi sai'
  }))
  
  const selectedPassages = shuffleArray(p3Passages).slice(0, 4)
  const p3Questions = []
  
  selectedPassages.forEach((passage) => {
    const shuffledQuestions = shuffleArray(passage.questions).map(q => ({
      ...q,
      partTitle: `Phần 3 — ${passage.title.trim()}`,
      readingContent: passage.readingContent
    }))
    p3Questions.push(...shuffledQuestions)
  })
  
  return [...p1Shuffled, ...p2Shuffled, ...p3Questions]
}

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

export const COURSES = [
  {
    id: 'anh-van-dau-vao-2026',
    title: 'Anh văn đầu vào 2026',
    description:
      'Ôn luyện và làm bài test trắc nghiệm Anh văn (cấu trúc, tìm lỗi, đọc hiểu).',
    available: true,
    questionCount: 185,
  },
]

export function getCourseById(id) {
  return COURSES.find((c) => c.id === id)
}

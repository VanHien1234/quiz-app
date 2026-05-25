import { useState } from 'react'
import HomePage from './pages/HomePage'
import AnhVanDauVao2026 from './courses/anh-van-dau-vao-2026/AnhVanDauVao2026'

const COURSE_PAGES = {
  'anh-van-dau-vao-2026': AnhVanDauVao2026,
}

export default function App() {
  const [activeCourseId, setActiveCourseId] = useState(null)

  if (activeCourseId) {
    const CoursePage = COURSE_PAGES[activeCourseId]
    if (CoursePage) {
      return <CoursePage onExit={() => setActiveCourseId(null)} />
    }
  }

  return <HomePage onSelectCourse={setActiveCourseId} />
}

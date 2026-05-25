import { COURSES } from '../courses/registry'
import '../styles/portal.css'

export default function HomePage({ onSelectCourse }) {
  return (
    <div className="portal">
      <header className="portal__header">
        <h1>E-Learn</h1>
        <p className="portal__subtitle">Chọn môn học để bắt đầu</p>
      </header>
      <main className="course-list">
        {COURSES.map((course) => (
          <button
            key={course.id}
            type="button"
            className={`course-card ${course.available ? '' : 'course-card--disabled'}`}
            onClick={() => course.available && onSelectCourse(course.id)}
            disabled={!course.available}
          >
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            {course.questionCount != null && (
              <span className="course-card__meta">
                {course.questionCount} câu hỏi
              </span>
            )}
            {!course.available && (
              <span className="course-card__badge">Sắp có</span>
            )}
          </button>
        ))}
      </main>
      {/* <p className="portal__hint">
        Thêm môn mới bằng cách tạo thư mục trong <code>src/courses/</code> và
        đăng ký trong <code>registry.js</code>.
      </p> */}
    </div>
  )
}

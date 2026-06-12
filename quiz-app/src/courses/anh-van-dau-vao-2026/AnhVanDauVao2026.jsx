import { useMemo, useState, useEffect } from 'react'
import {
  QUIZ_PARTS,
  getCorrectAnswer,
  isCorrectAnswer,
  generateFullTest,
} from './quizzes'
import '../../styles/quiz.css'

const COURSE_TITLE = 'Anh văn đầu vào 2026'

const MODE = {
  PRACTICE: 'practice',
  TEST: 'test',
}

function getOptionLabel(index) {
  return String.fromCharCode(65 + index)
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function AnhVanDauVao2026({ onExit }) {
  const [screen, setScreen] = useState('home')
  const [mode, setMode] = useState(null)
  const [activePart, setActivePart] = useState(null)
  const [testQuestions, setTestQuestions] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [checkedMap, setCheckedMap] = useState({})
  const [timeLeft, setTimeLeft] = useState(90 * 60)

  const isPractice = mode === MODE.PRACTICE
  const questions = isPractice ? (activePart?.questions ?? []) : (testQuestions ?? [])
  const total = questions.length
  const currentQuestion = questions[currentIndex]
  const answeredCount = Object.keys(answers).length

  useEffect(() => {
    let timer
    if (screen === 'test' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timer)
            setScreen('test-result')
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [screen, timeLeft])

  const results = useMemo(() => {
    return questions.map((q) => {
      const selected = answers[q.id]
      const correct = isCorrectAnswer(q, selected)
      const correctText = getCorrectAnswer(q)
      return { ...q, selected, correct, correctText }
    })
  }, [answers, questions])

  const score = results.filter((r) => r.correct).length

  const currentChecked = currentQuestion
    ? Boolean(checkedMap[currentQuestion.id])
    : false
  const currentSelected = currentQuestion
    ? answers[currentQuestion.id]
    : undefined
  const currentIsCorrect = currentQuestion
    ? isCorrectAnswer(currentQuestion, currentSelected)
    : false
  const currentCorrectText = currentQuestion
    ? getCorrectAnswer(currentQuestion)
    : ''

  function resetQuestionState() {
    setCurrentIndex(0)
    setAnswers({})
    setCheckedMap({})
  }

  function goCourseHome() {
    setScreen('home')
    setMode(null)
    setActivePart(null)
    setTestQuestions(null)
    resetQuestionState()
  }

  function enterMode(nextMode) {
    setMode(nextMode)
    resetQuestionState()
    if (nextMode === MODE.TEST) {
      setTestQuestions(generateFullTest())
      setScreen('test-start')
      setActivePart(null)
    } else {
      setScreen('topics')
      setActivePart(null)
      setTestQuestions(null)
    }
  }

  function selectPart(part) {
    setActivePart(part)
    setScreen(isPractice ? 'practice' : 'test-start')
    resetQuestionState()
  }

  function selectAnswer(optionText) {
    if (!currentQuestion) return
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionText,
    }))
    setCheckedMap((prev) => {
      const next = { ...prev }
      delete next[currentQuestion.id]
      return next
    })
  }

  function checkAnswer() {
    if (!currentQuestion || !currentSelected) return
    setCheckedMap((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }))
  }

  function goNext() {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
    }
  }

  function startTest() {
    setScreen('test')
    setCurrentIndex(0)
    setAnswers({})
    setCheckedMap({})
    setTimeLeft(90 * 60)
  }

  function submitTest() {
    setScreen('test-result')
  }

  function backToTopics() {
    setScreen('topics')
    setActivePart(null)
    resetQuestionState()
  }

  if (screen === 'home') {
    return (
      <div className="app">
        <header className="header">
          <button type="button" className="back-link" onClick={onExit}>
            ← Tất cả môn học
          </button>
          <h1>{COURSE_TITLE}</h1>
          <p className="subtitle">Chọn chế độ học tập</p>
        </header>
        <main className="mode-list">
          <button
            type="button"
            className="mode-card mode-card--practice"
            onClick={() => enterMode(MODE.PRACTICE)}
          >
            <span className="mode-card__icon">📖</span>
            <h2>Ôn luyện</h2>
            <p>
              Học theo từng chủ đề, kiểm tra đáp án từng câu và xem giải
              thích ngay.
            </p>
          </button>
          <button
            type="button"
            className="mode-card mode-card--test"
            onClick={() => enterMode(MODE.TEST)}
          >
            <span className="mode-card__icon">📝</span>
            <h2>Làm bài test</h2>
            <p>
              Làm bài như thi thật — không xem đáp án giữa chừng, nộp bài mới
              chấm điểm.
            </p>
          </button>
        </main>
      </div>
    )
  }

  if (screen === 'topics') {
    return (
      <div className="app">
        <header className="header">
          <button type="button" className="back-link" onClick={goCourseHome}>
            ← {COURSE_TITLE}
          </button>
          <h1>{isPractice ? 'Ôn luyện' : 'Làm bài test'}</h1>
          <p className="subtitle">Chọn chủ đề (phần)</p>
        </header>
        <main className="part-list">
          {QUIZ_PARTS.map((part) => (
            <button
              key={part.id}
              type="button"
              className="part-card"
              onClick={() => selectPart(part)}
            >
              <span className="part-card__badge">Phần {part.part}</span>
              <h2>{part.title}</h2>
              <p>{part.description}</p>
              <span className="part-card__meta">
                {part.questions.length} câu · 
                {/* {part.file} */}
              </span>
            </button>
          ))}
        </main>
      </div>
    )
  }

  if (screen === 'test-start' && (isPractice ? activePart : testQuestions)) {
    const title = isPractice ? activePart.title : 'Bài test tổng hợp'
    const description = isPractice 
      ? activePart.description 
      : 'Cấu trúc bài thi: 80 câu hỏi. Thời gian làm bài: 90 phút. Các câu hỏi được sắp xếp ngẫu nhiên.'
    return (
      <div className="app">
        <header className="header">
          <button type="button" className="back-link" onClick={isPractice ? backToTopics : goCourseHome}>
            ← {isPractice ? 'Chọn chủ đề' : 'Trang chính'}
          </button>
          <h1>{title}</h1>
          <p className="subtitle">{description}</p>
        </header>
        <main className="card card--center">
          <p className="meta">
            {total} câu hỏi · làm hết rồi nộp bài để xem kết quả
          </p>
          <div className="actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={startTest}
            >
              Bắt đầu làm bài
            </button>
            <button type="button" className="btn" onClick={isPractice ? backToTopics : goCourseHome}>
              {isPractice ? 'Chọn chủ đề khác' : 'Quay lại'}
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (screen === 'test-result' && (isPractice ? activePart : testQuestions)) {
    const percent = total > 0 ? Math.round((score / total) * 100) : 0
    const title = isPractice ? activePart.title : 'Bài test tổng hợp'

    return (
      <div className="app">
        <header className="header">
          <h1>Kết quả test — {title}</h1>
          <p className="subtitle">
            Đúng <strong>{score}</strong> / {total} câu ({percent}%)
          </p>
        </header>
        <main className="results">
          {results.map((item) => (
            <article
              key={item.id}
              className={`result-item ${item.correct ? 'result-item--ok' : 'result-item--fail'}`}
            >
              <h3>
                <span className="result-id">{item.id}</span>
                <span dangerouslySetInnerHTML={{ __html: item.question }} />
              </h3>
              <p>
                Bạn chọn: <span>{item.selected ?? '— (chưa chọn)'}</span>
              </p>
              {!item.correct && (
                <p className="correct-answer">
                  Đáp án đúng: <strong>{item.correctText}</strong>
                </p>
              )}
              {item.desc && <p className="result-desc">{item.desc}</p>}
            </article>
          ))}
        </main>
        <footer className="footer footer--stack">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              if (!isPractice) {
                setTestQuestions(generateFullTest())
              }
              setScreen('test-start')
              resetQuestionState()
            }}
          >
            Làm lại bài test
          </button>
          <button type="button" className="btn" onClick={isPractice ? backToTopics : goCourseHome}>
            {isPractice ? 'Chọn chủ đề khác' : 'Quay lại trang chính'}
          </button>
        </footer>
      </div>
    )
  }

  if (
    (screen === 'practice' || screen === 'test') &&
    currentQuestion &&
    (isPractice ? activePart : testQuestions)
  ) {
    const progress = ((currentIndex + 1) / total) * 100
    const showCheckUi = screen === 'practice'

    return (
      <div className="app">
        <header className="header header--compact">
          <button
            type="button"
            className="back-link back-link--inline"
            onClick={isPractice ? backToTopics : goCourseHome}
          >
            ← {isPractice ? 'Chủ đề' : 'Trang chính'}
          </button>
          <p className="part-title">
            {isPractice ? `Ôn luyện · ${activePart.title}` : `Test · ${currentQuestion.partTitle || 'Bài test'}`}
          </p>
          <div className="header-row">
            <span className="badge">#{currentQuestion.id}</span>
            <span className="badge">
              {currentIndex + 1} / {total}
            </span>
            {screen === 'test' && (
              <span className="badge badge--timer">
                ⏳ {formatTime(timeLeft)}
              </span>
            )}
            {!showCheckUi && (
              <span className="badge badge--muted">
                Đã trả lời: {answeredCount}/{total}
              </span>
            )}
          </div>
          <div className="progress" aria-hidden="true">
            <div className="progress__bar" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <main className="card">
          {(isPractice ? activePart?.readingContent : currentQuestion?.readingContent) && (
            <details className="reading" open>
              <summary className="reading__toggle">Đoạn văn đọc hiểu</summary>
              <div className="reading__content">
                {(isPractice ? activePart.readingContent : currentQuestion.readingContent).split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </details>
          )}
          <h2 className="question" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
          <ul className="options" role="radiogroup" aria-label="Chọn đáp án">
            {currentQuestion.options.map((optionText, index) => {
              const isSelected = currentSelected === optionText
              const isCorrectOption = optionText === currentCorrectText
              const showResult = showCheckUi && currentChecked

              let optionClass = 'option'
              if (isSelected) optionClass += ' option--selected'
              if (showResult && isCorrectOption) {
                optionClass += ' option--correct'
              }
              if (showResult && isSelected && !isCorrectOption) {
                optionClass += ' option--wrong'
              }

              return (
                <li key={`${currentQuestion.id}-${index}`}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={optionClass}
                    onClick={() => selectAnswer(optionText)}
                    disabled={showCheckUi && currentChecked}
                  >
                    <span className="option__label">
                      {getOptionLabel(index)}
                    </span>
                    <span className="option__text">{optionText}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {showCheckUi && (
            <div className="practice-actions">
              {!currentChecked && (
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  onClick={checkAnswer}
                  disabled={!currentSelected}
                >
                  Kiểm tra đáp án
                </button>
              )}

              {currentChecked && (
                <div
                  className={`feedback ${currentIsCorrect ? 'feedback--ok' : 'feedback--fail'}`}
                  role="status"
                >
                  <p className="feedback__title">
                    {currentIsCorrect ? '✓ Chính xác!' : '✗ Chưa đúng'}
                  </p>
                  {!currentIsCorrect && (
                    <p className="feedback__answer">
                      Đáp án đúng: <strong>{currentCorrectText}</strong>
                    </p>
                  )}
                  {currentQuestion.desc ? (
                    <p className="feedback__desc">{currentQuestion.desc}</p>
                  ) : (
                    <p className="feedback__desc feedback__desc--empty">
                      Chưa có giải thích cho câu này.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="footer footer--nav">
          <button
            type="button"
            className="btn"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            Câu trước
          </button>
          {screen === 'test' && currentIndex < total - 1 ? (
            <button type="button" className="btn btn--primary" onClick={goNext}>
              Câu tiếp
            </button>
          ) : screen === 'test' ? (
            <button
              type="button"
              className="btn btn--primary"
              onClick={submitTest}
            >
              Nộp bài
            </button>
          ) : currentIndex < total - 1 ? (
            <button
              type="button"
              className="btn btn--primary"
              onClick={goNext}
              disabled={showCheckUi && !currentSelected}
            >
              Câu tiếp
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--primary"
              onClick={backToTopics}
            >
              Hoàn thành chủ đề
            </button>
          )}
        </footer>
      </div>
    )
  }

  return null
}

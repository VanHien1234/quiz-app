# Thêm môn học mới

Project thiết kế **nhiều môn** trên một portal E-Learn.

## Các bước

### 1. Tạo thư mục môn

```
quiz-app/src/courses/ten-mon-hoc/
├── TenMonHoc.jsx      # Trang môn (copy từ AnhVanDauVao2026.jsx)
└── quizzes.js         # Import dữ liệu JSON
```

### 2. Dữ liệu

- Đặt file JSON trong `quiz-app/data/ten-mon-hoc/` (ví dụ như `data/anhVanDauVao2026/`)  
- Import trong `quizzes.js` giống môn Anh văn:

```js
import data from './data/questions.json'
export const QUIZ_PARTS = [ /* ... */ ]
```

### 3. Đăng ký trong `registry.js`

```js
// quiz-app/src/courses/registry.js
{
  id: 'ten-mon-hoc',
  title: 'Tên môn hiển thị',
  description: 'Mô tả ngắn',
  available: true,
  questionCount: 100,
}
```

### 4. Map trong `App.jsx`

```js
import TenMonHoc from './courses/ten-mon-hoc/TenMonHoc'

const COURSE_PAGES = {
  'anh-van-dau-vao-2026': AnhVanDauVao2026,
  'ten-mon-hoc': TenMonHoc,
}
```

### 5. Kiểm tra

```bash
cd quiz-app
npm run dev
```

Portal → chọn môn mới → thử ôn luyện / test.

## Gợi ý tái sử dụng

- Copy `AnhVanDauVao2026.jsx`, đổi `COURSE_TITLE` và import `quizzes.js`  
- Giữ `onExit` để quay về **Tất cả môn học**  
- Style dùng chung `src/styles/quiz.css`

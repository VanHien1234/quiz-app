# E-Learn — Quiz App (frontend)

Nền tảng ôn luyện trắc nghiệm — hỗ trợ nhiều môn học.

**Tài liệu đầy đủ:** [../docs/README.md](../docs/README.md)

## Chạy dự án

```bash
cd quiz-app
npm install
npm run dev
```

## Cấu trúc

```
quiz-app/src/
├── App.jsx                 # Điều hướng: portal ↔ môn học
├── pages/HomePage.jsx      # Trang chủ — danh sách môn
├── courses/
│   ├── registry.js         # Đăng ký các môn học
│   └── anh-van-dau-vao-2026/
│       ├── AnhVanDauVao2026.jsx   # Trang "Anh văn đầu vào 2026"
│       └── quizzes.js             # Dữ liệu p1, p2, p3
└── styles/
    ├── portal.css
    └── quiz.css

data/anhVanDauVao2026/        # Dữ liệu môn Anh văn đầu vào 2026
├── p1.json
├── p2.json
└── p3.json
```

## Môn hiện có

| Môn | ID | Dữ liệu |
|-----|-----|---------|
| **Anh văn đầu vào 2026** | `anh-van-dau-vao-2026` | `data/anhVanDauVao2026/*.json` |

## Thêm môn học mới

1. Tạo thư mục `src/courses/ten-mon-hoc/`
2. Thêm component trang (ví dụ `TenMonHoc.jsx`) và file `quizzes.js`
3. Đăng ký trong `src/courses/registry.js`
4. Map component trong `App.jsx` → `COURSE_PAGES`

## Anh văn đầu vào 2026

- **Ôn luyện**: theo chủ đề, kiểm tra đáp án tuỳ chọn, xem `desc`
- **Làm bài test**: nộp bài mới chấm điểm
- Phần 3: 7 đoạn văn (`p3.json`), mỗi đoạn 10 câu

## Deploy

- [Deploy GitHub Pages](../docs/deploy-github-pages.md)
- [Các lựa chọn deploy khác](../docs/deploy-tuy-chon.md)

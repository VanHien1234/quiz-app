# Cấu trúc dự án

## Tổng quan

```
e-learn/                          # Root repo (push lên GitHub)
├── docs/                         # Tài liệu (file markdown)
├── .github/workflows/            # CI deploy GitHub Pages
└── quiz-app/                     # Frontend React + Vite
    ├── data/
    │   └── anhVanDauVao2026/     # p1.json, p2.json, p3.json
    ├── src/
    │   ├── App.jsx               # Portal ↔ chọn môn
    │   ├── pages/HomePage.jsx
    │   ├── courses/
    │   │   ├── registry.js
    │   │   └── anh-van-dau-vao-2026/
    │   │       ├── AnhVanDauVao2026.jsx
    │   │       └── quizzes.js
    │   └── styles/
    ├── dist/                     # Output build (không commit)
    └── package.json
```

## Luồng người dùng

1. **E-Learn** (trang chủ) — danh sách môn học  
2. **Anh văn đầu vào 2026** — môn hiện có  
3. **Ôn luyện** hoặc **Làm bài test**  
4. Chọn chủ đề (Phần 1, 2, hoặc 7 passage Phần 3)  
5. Làm câu hỏi  

## Môn học: Anh văn đầu vào 2026

| Chế độ | Mô tả |
|--------|--------|
| **Ôn luyện** | Chọn đáp án → (tuỳ chọn) Kiểm tra đáp án → xem `desc` → Câu tiếp |
| **Làm bài test** | Làm hết → Nộp bài → xem điểm và chi tiết |

## Công nghệ

- React 19 + Vite 8  
- Không backend — dữ liệu bundle vào JS khi build  
- Routing: state trong React (không dùng react-router)

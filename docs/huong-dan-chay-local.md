# Hướng dẫn chạy project trên máy

## Yêu cầu

- [Node.js](https://nodejs.org/) LTS (khuyến nghị v18 trở lên)
- npm (đi kèm Node.js)

## Cài đặt lần đầu

```bash
cd quiz-app
npm install
```

## Chạy development

```bash
cd quiz-app
npm run dev
```

Mở URL trên terminal (thường `http://localhost:5173`).

## Build production (kiểm tra trước khi deploy)

```bash
cd quiz-app
npm run build
npm run preview
```

Mở `http://localhost:4173` — đây là bản giống production.

## Lint (tuỳ chọn)

```bash
cd quiz-app
npm run lint
```

## Lưu ý

- Dữ liệu câu hỏi: `quiz-app/data/anhVanDauVao2026/p1.json`, `p2.json`, `p3.json`.
- Sau khi sửa JSON, chỉ cần refresh trang dev (hoặc build lại nếu preview/production).

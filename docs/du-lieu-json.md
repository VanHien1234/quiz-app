# Dữ liệu JSON

File dữ liệu nằm tại `quiz-app/data/anhVanDauVao2026/`.

## `p1.json` và `p2.json`

Mỗi file là **mảng** câu hỏi:

```json
{
  "id": "1.1",
  "part": "1",
  "question": "Nội dung câu hỏi",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctAnwser": "Đáp án đúng",
  "desc": "Giải thích (có thể để trống)"
}
```

| Trường | Ghi chú |
|--------|---------|
| `id` | Mã câu, ví dụ `1.1`, `2.15` |
| `part` | `"1"` hoặc `"2"` |
| `options` | Mảng chuỗi |
| `correctAnwser` | **Chính tả như file gốc** — phải khớp chính xác một phần tử trong `options` |
| `desc` | Giải thích tiếng Việt |

- **p1.json:** 40 câu (Phần 1 — cấu trúc câu)  
- **p2.json:** 75 câu (Phần 2 — tìm lỗi sai)

## `p3.json` (đọc hiểu)

Mảng **7 passage**:

```json
{
  "title": "PASSAGE 1",
  "readingContent": "Đoạn 1...\n\nĐoạn 2...",
  "questions": [ /* 10 câu: 3.1 – 3.10 */ ]
}
```

| Trường | Ghi chú |
|--------|---------|
| `title` | Ví dụ `PASSAGE 1` |
| `readingContent` | Một chuỗi JSON; các đoạn văn cách nhau bằng `\n\n` |
| `questions` | Cùng schema câu hỏi như p1/p2 (`id` dạng `3.1` … `3.70`) |

**Không** dùng:

- Xuống dòng thô trong chuỗi JSON (invalid JSON)  
- Backtick `` ` `` bọc ngoài nội dung  
- `\"` thừa ở đầu/cuối chuỗi  

## Sau khi sửa JSON

```bash
cd quiz-app
npm run dev
```

Hoặc `npm run build` trước khi deploy.

## Script hỗ trợ (tuỳ chọn)

- `node scripts/build-p3.js` — build lại `p3.json` từ `scripts/reading-passages.js`  
- Chỉ dùng khi bạn chỉnh nội dung trong `reading-passages.js`

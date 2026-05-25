# Deploy lên GitHub Pages — Hướng dẫn từng bước

App nằm trong `quiz-app/`. Repo GitHub chứa **toàn bộ** thư mục `e-learn` (dữ liệu trong `quiz-app/data/anhVanDauVao2026/`).

**URL sau deploy:**

```text
https://<username>.github.io/<tên-repo>/
```

Ví dụ repo `e-learn`, user `nguyenvana`:

```text
https://nguyenvana.github.io/e-learn/
```

**Đã cấu hình sẵn trong project:**

| File | Mục đích |
|------|----------|
| `.github/workflows/deploy-pages.yml` | Tự build + deploy khi push `main` |
| `quiz-app/vite.config.js` | `base` = `/<tên-repo>/` qua biến `VITE_BASE` |
| `.gitignore` | Bỏ `node_modules`, `dist` |

---

## Phần A — Chuẩn bị trên máy (một lần)

### Bước 1 — Cài Git

- Tải: https://git-scm.com/download/win  
- Kiểm tra: `git --version`

### Bước 2 — Tài khoản GitHub

- Đăng ký: https://github.com/signup  
- Ghi nhớ **username** (dùng trong URL Pages).

### Bước 3 — Kiểm tra build production

```bash
cd quiz-app
npm install
npm run build
npm run preview
```

Mở http://localhost:4173 — app chạy ổn thì mới deploy.

### Bước 4 — Kiểm tra file JSON

- `quiz-app/data/anhVanDauVao2026/p1.json`, `p2.json`, `p3.json`  
- `p3.json` là mảng passage hợp lệ (xem [du-lieu-json.md](du-lieu-json.md))

---

## Phần B — Đưa code lên GitHub

### Bước 5 — Tạo repository

1. GitHub → **New repository**  
2. **Repository name:** ví dụ `e-learn` (= một phần URL)  
3. **Public**  
4. Không thêm README nếu push từ máy  
5. **Create repository**

### Bước 6 — Khởi tạo Git

```bash
cd D:\e-learn
git init
git add .
git commit -m "Initial commit: E-Learn quiz app"
```

### Bước 7 — Push lên GitHub

Thay `YOUR_USERNAME` và `YOUR_REPO`:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Lần đầu: đăng nhập GitHub (trình duyệt hoặc [Personal Access Token](https://github.com/settings/tokens)).

---

## Phần C — Bật GitHub Pages

### Bước 8 — Cấu hình Pages

1. Repo → **Settings** → **Pages**  
2. **Build and deployment** → **Source:** `GitHub Actions`  
3. Không chọn “Deploy from a branch”.

### Bước 9 — Chờ workflow

1. Tab **Actions** → **Deploy to GitHub Pages**  
2. Push `main` kích hoạt: `npm ci` → `npm run build` (trong `quiz-app/`) → deploy `dist`  
3. Biểu tượng ✅ = thành công.

### Bước 10 — Mở site

- **Settings → Pages** → **Visit site**  
- Hoặc: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

Lần đầu có thể mất **2–5 phút**.

---

## Phần D — Cập nhật sau này

```bash
cd D:\e-learn
git add .
git commit -m "Mô tả thay đổi"
git push
```

GitHub Actions tự deploy lại.

---

## Phần E — Xử lý lỗi

| Triệu chứng | Cách xử lý |
|-------------|------------|
| Trang trắng / 404 | Mở đúng URL có `/tên-repo/` ở cuối |
| CSS/JS không load | Đổi tên repo → push lại (workflow set lại `VITE_BASE`) |
| Build fail (Actions) | Tab Actions → xem log; thường do JSON lỗi hoặc `npm ci` |
| `p3.json` invalid | Sửa local → `npm run build` → push |

---

## Cách 2 — Deploy thủ công (gh-pages)

Không bắt buộc nếu đã dùng Actions.

```bash
cd quiz-app
npm install -D gh-pages
```

**Windows (cmd):**

```bash
set VITE_BASE=/YOUR_REPO/
npm run build
npx gh-pages -d dist
```

**PowerShell:**

```powershell
$env:VITE_BASE="/YOUR_REPO/"
npm run build
npx gh-pages -d dist
```

Sau đó: Settings → Pages → Source: branch **`gh-pages`**, folder `/ (root)`.

---

## Checklist tóm tắt

- [ ] 1. Cài Git  
- [ ] 2. Tài khoản GitHub  
- [ ] 3. `npm run build` + `preview` OK  
- [ ] 4. JSON `p1` / `p2` / `p3` hợp lệ  
- [ ] 5. Tạo repo GitHub (public)  
- [ ] 6. `git init` + commit tại `D:\e-learn`  
- [ ] 7. `git push` lên `main`  
- [ ] 8. Settings → Pages → Source: **GitHub Actions**  
- [ ] 9. Workflow Actions thành công  
- [ ] 10. Mở `https://<user>.github.io/<repo>/`

---

## Xem thêm

- [Các lựa chọn deploy khác](deploy-tuy-chon.md)  
- [Chạy project local](huong-dan-chay-local.md)

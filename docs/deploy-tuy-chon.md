# Các lựa chọn deploy (public)

App là **static site** (React + Vite → thư mục `quiz-app/dist`). Dữ liệu JSON được **bundle vào JS** khi build — **không cần server/backend**.

## Trước khi deploy

```bash
cd quiz-app
npm run build
npm run preview
```

Thư mục cần publish: **`quiz-app/dist`** (khi deploy từ monorepo, CI build trong `quiz-app/`).

---

## So sánh nhanh

| Nền tảng | Độ dễ | CDN | Free | Auto deploy Git |
|----------|--------|-----|------|-----------------|
| [GitHub Pages](deploy-github-pages.md) | ★★★☆☆ | ★★★☆☆ | ✓ | ✓ |
| **Vercel** | ★★★★★ | ★★★★☆ | ✓ | ✓ |
| **Cloudflare Pages** | ★★★★☆ | ★★★★★ | ✓ | ✓ |
| **Netlify** | ★★★★★ | ★★★★☆ | ✓ | ✓ |
| **Firebase Hosting** | ★★★☆☆ | ★★★★☆ | ✓ | ✓ |
| **VPS + Nginx** | ★★☆☆☆ | Tùy setup | ✗ | ✗ |

**Gợi ý:** Học tập, traffic vừa → **GitHub Pages** (đã cấu hình sẵn) hoặc **Vercel** / **Cloudflare Pages**.

---

## 1. GitHub Pages

Chi tiết: **[deploy-github-pages.md](deploy-github-pages.md)**

- URL: `https://<user>.github.io/<repo>/`  
- Đã có: `.github/workflows/deploy-pages.yml`, `VITE_BASE` trong Vite  

---

## 2. Vercel

1. Đăng ký https://vercel.com  
2. Import repo GitHub  
3. **Root Directory:** `quiz-app`  
4. **Build Command:** `npm run build`  
5. **Output Directory:** `dist`  

Hoặc CLI:

```bash
cd quiz-app
npm run build
npx vercel --prod
```

`base` mặc định `/` — domain dạng `ten-project.vercel.app`.

---

## 3. Cloudflare Pages

1. https://dash.cloudflare.com → Pages → Create  
2. Connect Git  
3. **Framework:** Vite  
4. **Root directory:** `quiz-app`  
5. **Build:** `npm run build`  
6. **Output:** `dist`  

CDN Cloudflare, băng thông free tier rộng.

---

## 4. Netlify

1. https://app.netlify.com → Add new site → Import Git  
2. **Base directory:** `quiz-app`  
3. **Build:** `npm run build`  
4. **Publish:** `dist`  

Hoặc kéo thả folder `dist` lên Netlify Drop.

---

## 5. Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
cd quiz-app
npm run build
firebase init hosting   # chọn dist
firebase deploy
```

---

## 6. VPS (Nginx)

Build local, copy `dist/` lên server:

```nginx
server {
    listen 80;
    root /var/www/e-learn/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Phù hợp khi sau này thêm API/backend.

---

## Lưu ý chung

1. Chỉ deploy sau khi `npm run build` thành công local.  
2. Không upload `node_modules` — chỉ `dist` hoặc để CI build.  
3. **GitHub Pages** cần URL có `/tên-repo/` ở cuối.  
4. **Vercel / Netlify / Cloudflare** thường dùng `base: '/'` (đã đúng khi không set `VITE_BASE`).  
5. Mỗi lần sửa JSON/code → push Git → platform tự build lại (nếu bật CI).

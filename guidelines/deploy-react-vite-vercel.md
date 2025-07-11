# Xem Hướng dẫn Deploy React Vite TypeScript lên Vercel


**Bước 1**: Cài đặt Vercel

```bash
npm install --global vercel
```

Cài ở chế độ global toàn cục để tất cả project sau này đều dùng được,

**Bước 2**: Tạo `.gitignore `

Tạo một file .gitignore tại thư mục gốc dự án

Thêm dòng này vào trên đầu

```text
vercel
```

**Bước 3**: Login Vercel

Tại thư mục gốc dự án trong cửa sổ `terminal` bạn nhập lệnh

```bash
vercel login
```

Vercel sẽ liệt kê cho bạn danh sách các phương thức xác thực. Trong đó bạn chọn Login bằng `Github`.

Vercel sinh ra cho bạn một cái link để chuyển hướng đăng nhập.

**Bước 4**: Build Project

Tiếp đó đánh lệnh build project, để biên dịch typescript thành javascript. Kết quả được xuất ra tại thư mục `dist`

```bash
yarn build
```


**Bước 5**: Deploy

Để deploy lên vercel, bạn cần tạo ra một file `vercel.json` trong thư mục gốc nhự án như sau:

```js
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Tiếp theo bạn nhập lệnh

```bash
vercel
```

Vercel sẽ chạy theo trình tự

```bash
? Set up and deploy “E:\PROJECT-SOFTECJ\dêm-react-ecommcer”? yes
? Which scope do you want to deploy to? nhan's projects
? Link to existing project? no
? What’s your project’s name? dem-react-ecommcer-auto
? In which directory is your code located? ./
Local settings detected in vercel.json:
Auto-detected Project Settings (Vite):
- Build Command: vite build
- Development Command: vite --port $PORT
- Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
- Output Directory: dist
? Want to modify these settings? no
```

Kết quả

```bash
Linked to nhans-projects/dem-react-ecommcer-auto (created .vercel and added it to .gitignore)
🔍  Inspect: https://vercel.com/nhans-projects/dem-react-ecommcer-auto/dFdZGmKC3onEiCTGKiv2Ymw6nj7a [2s]
✅  Production: https://dem-react-ecommcer-auto-hryo914u9-nhans-projects.vercel.app [2s]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡  To change the domain or build command, go to https://vercel.com/nhans-projects/dem-react-ecommcer-auto/settin🔗  Linked to nhans-projects/dem-react-ecommcer-auto (created .vercel and added it to .gitignore)
🔍  Inspect: https://vercel.com/nhans-projects/dem-react-ecommcer-auto/dFdZGmKC3onEiCTGKiv2Ymw6nj7a [2s]
✅  Production: https://dem-react-ecommcer-auto-hryo914u9-nhans-projects.vercel.app [2s]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡  To change the domain or build command, go to https://vercel.com/nhans-projects/dem-react-ecommcer-auto/settin✅  Production: https://dem-react-ecommcer-auto-hryo914u9-nhans-projects.vercel.app [2s]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡  To change the domain or build command, go to https://vercel.com/nhans-projects/dem-react-ecommcer-auto/settin💡  To change the domain or build command, go to https://vercel.com/nhans-projects/dem-react-ecommcer-auto/settings
```

Sau đó bạn kiểm tra trạng thái Online trên Dashboard của vercel xem thành công chưa

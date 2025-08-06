# GitHub Actions CI/CD Setup for Netlify Deployment

Workflow này sẽ tự động build và deploy dự án React TypeScript (react-ts-app) lên Netlify khi có push hoặc pull request.

## Yêu cầu Setup

### 1. Tạo tài khoản Netlify và Site

1. Đăng ký/đăng nhập vào [Netlify](https://www.netlify.com/)
2. Tạo một site mới (có thể tạo từ Git repository hoặc manual deploy)
3. Lấy **Site ID** từ Site settings > General > Site / Project details

### 2. Tạo Netlify Personal Access Token

1. Vào [User settings](https://app.netlify.com/user/applications#personal-access-tokens)
2. Click "New access token"
3. Đặt tên và tạo token
4. Copy token (chỉ hiển thị 1 lần)

### 3. Thêm GitHub Secrets

Vào repository GitHub > Settings > Secrets and variables > Actions, thêm các secrets sau:

- `NETLIFY_AUTH_TOKEN`: Personal access token từ bước 2
- `NETLIFY_SITE_ID`: Site ID từ bước 1

### 4. Workflow Features

#### Triggers

- Push vào branch `main` với changes trong thư mục `react-ts-app/`
- Pull Request vào branch `main` với changes trong thư mục `react-ts-app/`
- Manual trigger (workflow_dispatch)

#### Steps

1. **Checkout code**: Lấy source code từ repository
2. **Setup Node.js**: Cài đặt Node.js version 18 với npm cache
3. **Install dependencies**: Chạy `npm ci` để cài đặt dependencies
4. **ESLint check**: Kiểm tra code quality với ESLint
5. **Type check**: Kiểm tra TypeScript types
6. **Build**: Build dự án với Vite
7. **Deploy**: Deploy lên Netlify
8. **PR Comment**: Comment link preview cho Pull Request

#### Environment Variables

- `NODE_VERSION`: '18'
- `PROJECT_DIR`: 'react-ts-app'

## Cấu trúc Workflow

```yaml
name: Deploy React TypeScript App to Netlify

on:
  push:
    branches: [main]
    paths: ['react-ts-app/**']
  pull_request:
    branches: [main] 
    paths: ['react-ts-app/**']
  workflow_dispatch:
```

## Lưu ý

1. Workflow chỉ trigger khi có changes trong thư mục `react-ts-app/`
2. Build output được deploy từ thư mục `react-ts-app/dist`
3. Sử dụng `npm ci` thay vì `npm install` để đảm bảo reproducible builds
4. Type checking được chạy riêng trước khi build
5. ESLint check để đảm bảo code quality
6. Cần đảm bảo các secrets đã được thiết lập đúng trong GitHub repository

## Troubleshooting

### Build fails

- Kiểm tra Node.js version compatibility
- Đảm bảo tất cả dependencies trong package.json được cài đặt đúng
- Kiểm tra TypeScript errors

### Deploy fails

- Kiểm tra NETLIFY_AUTH_TOKEN có đúng không
- Kiểm tra NETLIFY_SITE_ID có đúng không
- Đảm bảo Netlify site đã được tạo

### ESLint errors

- Fix ESLint warnings/errors trong code
- Hoặc update ESLint config nếu cần thiết

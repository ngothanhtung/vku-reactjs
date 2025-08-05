# OAuth2 Authentication Flow with Google

This project demonstrates how to implement OAuth2 authentication flow using Google as the identity provider. It includes a simple web application that allows users to log in with their Google account and access protected resources.

## Prerequisites

- Node.js and npm installed on your machine.
- A Google account to create OAuth2 credentials.
- Basic understanding of JavaScript and web development.
- Example for React.js, but can be adapted for other frameworks.

## Setup Instructions

### 1. Create a google project

- Go to the [Google Developers Console](https://console.developers.google.com/).
- Create a new project.
- Configure consent screen
  - Fill in the required fields such as application name, support email, and developer contact information.
  - Audience: External.
  - Add scopes if necessary (e.g., email, profile).
  - Navigate to "Credentials" and create OAuth 2.0 credentials (Create OAuth client ID).
  - Application type: Web application.
  - Name: The name of your application.
  - Authorized JavaScript origins:
    - Add `http://localhost:3000` or your application's domain.
    - Add `http://localhost:5173` or your application's domain.

  - Authorized redirect URIs:
    - Set the redirect URI to `http://localhost:3000/auth/google/callback`.

- Copy the Client ID and Client Secret for later use.
  - ClientID:
  - ClientSecret:

### 2. Install dependencies

> Tham khảo: [text](https://react-oauth.vercel.app/)

```bash
npm install @react-oauth/google --save
```

### 3. Create a `.env` file in the root of your project and add the following environment variables

```plaintext
VITE_GOOGLE_CLIENT_ID=<your-client-id>
VITE_GOOGLE_CLIENT_SECRET=<your-client-secret>
```

### 4. Update your `src/App.tsx` file to include the Google OAuth component

### 5. Create a new component `src/Lesson26-OAuth2/index.tsx` and implement the Google OAuth logic

### 6. Manual Google Login Component

- index.html
  - Add the Google Identity Services script to your HTML file:
  
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

### 7. BackEnd Setup

#### Các bạn lưu ý, code thêm ở BACKEND, tham khảo project demo tại GitHub

1. Thêm CORS ở config/WebConfig
2. Thêm RestTemplate ở config/AppConfig
3. Bổ sung: GoogleLoginRequestDto, GoogleLoginWithCredentialRequestDto
4. Bổ sung findByEmail tại UserJpaRepository
5. Bổ sung googleLogin, googleLoginWithCredential tại UserService
6. Bổ sung googleLogin, googleLoginWithCredential tại AuthController

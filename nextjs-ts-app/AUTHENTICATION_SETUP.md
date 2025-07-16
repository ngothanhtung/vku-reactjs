# Authentication Setup Instructions

## Overview

This application uses NextAuth.js with username/password authentication. GitHub OAuth has been removed to focus on credentials-based authentication.

## 1. Environment Configuration

Open `.env.local` and ensure the following values are set:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-please-change-this-in-production
```

## 2. Generate a NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Replace `your-secret-key-here-please-change-this-in-production` with the generated secret.

## 3. Run the Application

```bash
npm run dev
```

## 4. Test the Authentication

1. Visit `http://localhost:3000`
2. Click "Sign In" in the top right
3. Use the test credentials:
   - Username: `admin` or `user`
   - Password: `password`

## Features Implemented

- ✅ Username/password authentication
- ✅ User registration
- ✅ Session management
- ✅ Protected routes (administration pages require login)
- ✅ User profile display
- ✅ Sign out functionality
- ✅ Responsive design
- ✅ TypeScript support

## Protected Routes

The `/administration` route and all its sub-routes are protected. Users must be authenticated to access them.

## Test Accounts

| Username | Password | Email | Role |
|----------|----------|-------|------|
| admin | password | admin@example.com | Administrator |
| user | password | user@example.com | Regular User |

## Customization

You can customize the authentication flow by:

- Modifying the sign-in page (`src/app/auth/signin/page.tsx`)
- Updating the user profile component (`src/components/UserProfile.tsx`)
- Adding more authentication providers in `src/auth.ts`
- Configuring additional protected routes in `src/middleware.ts`
- Updating the user management system in `src/lib/users.ts`

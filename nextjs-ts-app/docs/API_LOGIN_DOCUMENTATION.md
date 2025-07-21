# Remote API Login Documentation

## Overview

This Next.js application supports username/password authentication using NextAuth.js with a remote API backend. The authentication system connects to `https://server.aptech.io/auth/login` for user validation.

## Authentication Methods

### Username/Password (Credentials)

- Remote API authentication
- JWT tokens from remote server
- No local user storage or registration

## Remote API Integration

### Remote Login Endpoint

**URL:** `https://server.aptech.io/auth/login`

**Request Body:**

```json
{
  "username": "tungnt@softech.vn",
  "password": "123456789"
}
```

**Response (Success):**

```json
{
  "loggedInUser": {
    "id": 1,
    "email": "tungnt@softech.vn",
    "isActive": true,
    "roles": [
      {"id": 1, "name": "Administrators"},
      {"id": 2, "name": "Managers"}
    ]
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Test Credentials

| Username | Password |
|----------|----------|
| <tungnt@softech.vn> | 123456789 |

## Usage Examples

### Client-Side Authentication with NextAuth.js

```typescript
import { signIn } from 'next-auth/react';

// Sign in with credentials
const result = await signIn('credentials', {
  username: 'tungnt@softech.vn',
  password: '123456789',
  redirect: false,
});
```

### Direct API Testing

```typescript
// Test remote API directly
const response = await fetch('/api/test-remote-login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'tungnt@softech.vn',
    password: '123456789',
  }),
});

const data = await response.json();
```

## Security Features

1. **Remote API Authentication**: All authentication is handled by the remote server
2. **JWT Tokens**: Secure session management with NextAuth.js
3. **Protected Routes**: Middleware protection for admin routes
4. **No Local Storage**: No user data stored locally
5. **Error Handling**: Comprehensive error responses

## File Structure

```bash
src/
├── auth.ts                          # NextAuth.js configuration
├── middleware.ts                    # Route protection middleware
├── lib/
│   └── test-remote-api.ts          # Remote API testing utility
├── types/
│   └── index.ts                     # TypeScript interfaces
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts        # NextAuth.js API routes
│   │   ├── test-remote-login/
│   │   │   └── route.ts            # Remote API test endpoint
│   │   └── users/
│   │       └── route.ts            # Users API endpoint
│   └── auth/
│       └── signin/
│           └── page.tsx            # Sign in page
```

## Development Notes

- All authentication is handled by the remote API at `https://server.aptech.io/auth/login`
- No local user storage or registration functionality
- NextAuth.js handles session management and JWT tokens
- The system is designed for integration with the remote authentication service

## Testing

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Test credentials login:**
   - Visit `/auth/signin`
   - Use username: `tungnt@softech.vn`, password: `123456789`

3. **Test remote API directly:**

   ```bash
   # Test remote login
   curl -X POST http://localhost:3000/api/test-remote-login \
     -H "Content-Type: application/json" \
     -d '{"username":"tungnt@softech.vn","password":"123456789"}'
   ```

## Production Considerations

1. **Environment Variables**: Ensure REMOTE_API_URL is properly configured
2. **Error Handling**: Implement proper error handling for API failures
3. **Rate Limiting**: Consider rate limiting for authentication endpoints
4. **Security**: Ensure secure communication with the remote API
5. **Fallback**: Consider fallback mechanisms if the remote API is unavailable

import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

/**
 * Thêm Authorized JavaScript origins trong Google Cloud Console
 * For production: https://{YOUR_DOMAIN}
 * For development: http://localhost:3000
 * và Authorized redirect URIs trong Google Cloud Console
 * For production: https://{YOUR_DOMAIN}/api/auth/callback/google
 * For development: http://localhost:3000/api/auth/callback/google
 */
interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  role?: string;
}

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/login", //Dẫn đến trang login custom
    // error: "/auth/error", // Custom error page
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        //console.log('<<=== 🚀 payload ===>>',payload);

        // const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        //   method: 'POST',
        //   body: JSON.stringify(payload),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        const res = await fetch('https://server.aptech.io/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const tokens = await res.json();

        console.log('<<=== 🚀 tokens ===>>',tokens);

        if (!res.ok) {
          throw new Error("UnAuthorized");
        }
        if (tokens) {
          // Return user object with accessToken and refreshToken
          return {
            id: tokens.loggedInUser.id,
            name: tokens.loggedInUser.name,
            email: tokens.loggedInUser.email,
            avatar: tokens.loggedInUser.avatar,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          } as UserType;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    //cấu hình signIn để xử lý sau khi login với provider thành công 
    async signIn({ user, account, profile }) {
      console.log('=== SIGN IN CALLBACK ===');
      console.log('User:', user);
      console.log('Account:', account);
      console.log('Profile:', profile);

      if (account?.provider === 'google') {
        try {
          // Gọi API để verify/create user
          const response = await fetch('https://server.aptech.io/auth/google-signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              avatar: user.image,
              googleId: profile?.sub, // Google's unique identifier
            }),
          });

          if (!response.ok) {
            console.error('Failed to verify/create user with backend');
            return false;
          }

          const data = await response.json();
          
          // Thêm thông tin từ backend vào user object
          user.id = data.user.id;
          user.role = data.user.role;
          user.accessToken = data.access_token;
          user.refreshToken = data.refresh_token;
          
          return true;
        } catch (error) {
          console.error('Error during backend verification:', error);
          return false;
        }
      }

      return true;
    },
    
    async jwt({ token, user, account }) {
      console.log('=== JWT CALLBACK ===');
      console.log('Token:', token);
      console.log('User:', user);
      console.log('Account:', account);
      
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.avatar = (user.avatar ?? user.image ?? "") as string;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log('=== SESSION CALLBACK ===');
      console.log('Session:', session);
      console.log('Token:', token);
      // Create a user object with token properties
      const userObject: UserType = {
        id: token.id as string,
        avatar: (token.avatar as string) ?? "",
        name: (token.name as string) ?? "",
        accessToken: (token.accessToken as string) ?? "",
        refreshToken: (token.refreshToken as string) ?? "",
        email: (token.email as string) ?? "",
        role: (token.role as string) ?? "",
      };

      // Add the user object to the session
      session.user = userObject;
      return session;
    },
  },
};



declare module "next-auth" {
  interface User extends UserType {}
}

declare module "next-auth" {
  interface Session {
    user: UserType & {
      accessToken?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserType {}
}

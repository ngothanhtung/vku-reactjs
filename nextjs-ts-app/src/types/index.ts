export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  stock?: number;
}

// User authentication types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  image?: string;
  password?: string; // This should be hashed
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: Omit<User, 'password'>;
  message?: string;
}

// NextAuth types extension
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

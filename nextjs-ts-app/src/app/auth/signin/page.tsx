'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials');
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      setError('Sign in failed');
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
        </div>

        <div className='mt-8 space-y-6'>
          {/* Credentials Form */}
          <form onSubmit={handleCredentialsSubmit} className='space-y-4'>
            <div>
              <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                Email / Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter your email or username'
                value={credentials.username}
                onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter your password'
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>

            {error && <div className='text-red-600 text-sm'>{error}</div>}

            <button
              type='submit'
              disabled={isLoading}
              className={`
                group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
              `}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Test Credentials Info */}
          <div className='mt-4 p-4 bg-blue-50 rounded-md'>
            <p className='text-sm text-blue-800'>
              <strong>Test Credentials:</strong>
              <br />
              Username: <code className='bg-blue-100 px-1 rounded'>tungnt@softech.vn</code>
              <br />
              Password: <code className='bg-blue-100 px-1 rounded'>123456789</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

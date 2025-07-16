/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Unauthorized() {
  const { data: session } = useSession();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <div className='mx-auto h-12 w-12 text-red-500'>
            <svg fill='none' stroke='currentColor' viewBox='0 0 24 24' className='h-12 w-12'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z' />
            </svg>
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Access Denied</h2>
          <p className='mt-2 text-center text-sm text-gray-600'>You don&apos;t have permission to access the administration area.</p>
          <p className='mt-2 text-center text-sm text-gray-600'>Administrator role is required.</p>
        </div>

        <div className='mt-8 space-y-6'>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div className='bg-yellow-50 border border-yellow-200 rounded-md p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg className='h-5 w-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-yellow-800'>Current User Information</h3>
                  <div className='mt-2 text-sm text-yellow-700'>
                    <p>
                      <strong>Name:</strong> {session?.user?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {session?.user?.email}
                    </p>
                    <p>
                      <strong>Roles:</strong> {(session?.user as any)?.roles?.map((role: any) => role.name).join(', ') || 'No roles assigned'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex space-x-4'>
            <Link href='/' className='flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center'>
              Go to Home
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className='flex-1 py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

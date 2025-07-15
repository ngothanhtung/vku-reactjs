import React from 'react';

export default function Loading() {
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex space-x-2'>
            <div className='w-3 h-3 bg-blue-600 rounded-full animate-bounce'></div>
            <div className='w-3 h-3 bg-blue-600 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
            <div className='w-3 h-3 bg-blue-600 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className='text-gray-600 text-sm'>Loading...</p>
        </div>
      </div>
    </div>
  );
}

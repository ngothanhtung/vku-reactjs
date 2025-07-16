import React from 'react';
import ProtectedContent from '@/components/ProtectedContent';

export default function Index() {
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Dashboard</h1>
      <p className='text-gray-600 mb-6'>This is the dashboard page content.</p>
      <ProtectedContent />
    </div>
  );
}

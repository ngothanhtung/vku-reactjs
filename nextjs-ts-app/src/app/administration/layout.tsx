'use client';
import React, { useState } from 'react';

import SideBar from '@/components/SideBar';
import AdminProtection from '@/components/AdminProtection';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminProtection>
      <div className='flex h-screen bg-gray-100'>
        {/* Sidebar */}
        <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          {/* Header */}
          <header className='bg-white shadow-sm border-b border-gray-200'>
            <div className='flex items-center justify-between px-4 py-4'>
              <div className='flex items-center'>
                <button onClick={() => setSidebarOpen(true)} className='lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'>
                  <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                </button>
                <h2 className='ml-2 text-xl font-semibold text-gray-800'>Dashboard</h2>
              </div>
              <div className='flex items-center space-x-4'>
                <button className='p-2 rounded-full hover:bg-gray-100'>
                  <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-5 5l-5-5h5v-5h5v5z' />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className='flex-1 overflow-y-auto p-6'>{children}</main>
        </div>
      </div>
    </AdminProtection>
  );
}

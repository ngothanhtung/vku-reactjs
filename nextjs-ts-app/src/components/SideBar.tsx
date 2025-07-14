'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface SideBarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SideBar({ isOpen = true, onClose }: SideBarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      href: '/administration',
    },
    {
      id: 'users',
      label: 'Users',
      icon: '👥',
      href: '/administration/users',
    },
    {
      id: 'managers',
      label: 'Managers',
      icon: '👔',
      href: '/administration/managers',
    },
    {
      id: 'products',
      label: 'Products',
      icon: '🛍️',
      href: '/administration/products',
    },
    {
      id: 'products-ssg',
      label: 'Products SSG',
      icon: '🛍️',
      href: '/administration/products-ssg',
    },
    {
      id: 'products-isg',
      label: 'Products ISG',
      icon: '🛍️',
      href: '/administration/products-isg',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      href: '/administration/settings',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      href: '/administration/analytics',
    },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <React.Fragment>
      {/* Overlay for mobile */}
      {isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden' onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-5 border-b border-gray-200'>
          <h1 className='text-xl font-bold text-gray-800'>Admin Panel</h1>
          {/* Close button for mobile */}
          <button onClick={onClose} className='lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'>
            <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 py-6 space-y-2'>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => handleItemClick(item.id)}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                ${activeItem === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <span className='mr-3 text-lg'>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className='p-4 border-t border-gray-200'>
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium'>U</div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-700'>User Name</p>
              <p className='text-xs text-gray-500'>user@example.com</p>
            </div>
          </div>
          <button className='mt-3 w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'>Sign Out</button>
        </div>
      </div>
    </React.Fragment>
  );
}

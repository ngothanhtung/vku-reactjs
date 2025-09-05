import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-row gap-[12px] row-start-2 items-center sm:items-start'>
        <Link href='/'>Home</Link>
        {' | '}
        <Link href='/contact'>Contact</Link>
      </main>
    </div>
  );
}

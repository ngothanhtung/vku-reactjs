'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface UserProfileProps {
  className?: string;
}

export default function UserProfile({ className }: UserProfileProps) {
  const { data: session, status } = useSession();

  console.log('UserProfile session:', session);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900'></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className={className}>
        <button onClick={() => router.push('/auth/signin')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Sign In
        </button>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        {session.user.image && <Image src={session.user.image} alt={session.user.name || 'User'} width={32} height={32} className='rounded-full' />}
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>{session.user.name}</span>
          <span className='text-xs text-gray-500'>{session.user.email}</span>
        </div>
        <button onClick={handleSignOut} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm'>
          Sign Out
        </button>
      </div>
    );
  }

  return null;
}

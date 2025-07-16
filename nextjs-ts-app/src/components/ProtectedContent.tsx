/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedContent() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  // Check if user has admin role
  const userRoles = (session.user as any)?.roles || [];
  const hasAdminRole = userRoles.some((role: any) => role.name === 'Administrators');

  return (
    <div className='p-6 bg-green-50 rounded-lg'>
      <h2 className='text-2xl font-bold text-green-800 mb-4'>Welcome, {session.user?.name}!</h2>
      <p className='text-green-700 mb-4'>This is protected content that only authenticated users can see.</p>

      {/* Role Information */}
      <div className='mb-4 p-4 bg-blue-50 rounded border'>
        <h3 className='font-semibold text-blue-900 mb-2'>User Roles:</h3>
        <div className='space-y-1'>
          {userRoles.length > 0 ? (
            userRoles.map((role: any, index: number) => (
              <span key={index} className={`inline-block px-2 py-1 rounded text-sm mr-2 ${role.name === 'Administrators' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                {role.name}
              </span>
            ))
          ) : (
            <span className='text-gray-500'>No roles assigned</span>
          )}
        </div>
        <p className='text-sm text-blue-700 mt-2'>{hasAdminRole ? '✅ Has Administrator access' : '❌ No Administrator access'}</p>
      </div>

      {/* Session Information */}
      <div className='p-4 bg-white rounded border'>
        <h3 className='font-semibold text-gray-900 mb-2'>Session Information:</h3>
        <pre className='text-sm text-gray-900 bg-gray-100 p-2 rounded overflow-x-auto'>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}

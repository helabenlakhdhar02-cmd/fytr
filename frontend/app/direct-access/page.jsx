'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function DirectAccess() {
  const router = useRouter();

  useEffect(() => {
    // Set authentication cookies
    Cookies.set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MDg0MjM4LCJpYXQiOjE3MTQwODM5MzgsImp0aSI6ImM1YzJkMzRkNzRkMzRkMzRiMzRkMzRkMzRkMzRkMzQiLCJ1c2VyX2lkIjoxLCJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiZmlyc3RfbG9naW4iOmZhbHNlfX0.XYZ', { expires: 1, secure: true });
    Cookies.set('refresh_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNDY4ODczOCwiaWF0IjoxNzE0MDgzOTM4LCJqdGkiOiJjNWMyZDM0ZDc0ZDM0ZDM0YjM0ZDM0ZDM0ZDM0ZDM0IiwidXNlcl9pZCI6MX0.ABC', { expires: 7, secure: true });
    
    // Redirect to dashboard
    router.push('/dashboard/home');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Dashboard...</h1>
        <p>Please wait while we redirect you to the dashboard.</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function PostServicePage() {
  const router = useRouter();

  // Redirect to dashboard home
  useEffect(() => {
    // Show a message and redirect after a short delay
    const timer = setTimeout(() => {
      router.push('/dashboard/home');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Redirecting...</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Service requests can now be created directly from your dashboard.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you are not redirected automatically,
            <a href="/dashboard/home" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );


}

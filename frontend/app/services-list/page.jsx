'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

const ServicesListPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the website services page
    router.push('/website/services');
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Redirecting...</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Taking you to our services page.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you are not redirected automatically,
            <a href="/website/services" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesListPage;

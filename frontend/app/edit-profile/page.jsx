'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard edit-profile page
    router.replace('/dashboard/edit-profile');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

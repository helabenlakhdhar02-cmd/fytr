"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from "../../components/navigation/AdminNav";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAuth } from "../../context/AuthContext";
import { AdminActivityProvider } from "../../context/AdminActivityContext";
import { FaBars, FaTimes } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Check if user is admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || (user && user.role !== 'admin'))) {
      router.push('/login');
    }
  }, [isAuthenticated, user, loading, router]);

  // Handle responsive sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // If still loading or not authenticated, show loading state
  if (loading || !isAuthenticated || (user && user.role !== 'admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 dark:border-primary-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminActivityProvider>
      <div className="w-full relative bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 shadow-sm">
          <AdminNav />
        </div>

        <div className="flex h-[calc(100vh-64px)]">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } fixed lg:static inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-md lg:shadow-none overflow-y-auto`}
          >
            <AdminSidebar />
          </div>

          {/* Main content */}
          <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen && !isMobile ? 'ml-64' : 'ml-0 lg:ml-64'}`}>
            <main className="p-6">
              {children}
            </main>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </AdminActivityProvider>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FreelancerDashboard from "../../../components/Pages/FreelancerDashboard"
import ClientDashboard from "../../../components/Pages/ClientDashboard"
import FormateurDashboard from "../../../components/Pages/FormateurDashboard"
import AdminDashboard from "../../../components/Pages/AdminDashboard"

import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { refreshAccessToken, logoutUser } from '../../../lib/auth';

export default function Profile() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        let newToken = await refreshAccessToken();
        if (!newToken) {
          console.log('No valid token available, redirecting to login');
          // Clear any remaining auth data
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          router.push('/login');
        } else {
          setToken(newToken);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      try {
        const decoded = jwt.decode(accessToken);
        if (decoded && decoded.user) {
          console.log('User from token:', decoded.user);
          setUser(decoded.user);
        } else {
          console.error('Invalid token format');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [token, router]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center max-w-md mx-auto">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700 border-t-primary-600 dark:border-t-primary-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/fyterlance.png" alt="Logo" className="h-8 w-auto opacity-30" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Please wait while we load your dashboard...</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          {/* Role-based dashboard */}
          {user.role === "freelancer" && (
            <FreelancerDashboard user={user} />
          )}
          {user.role === "formateur" && (
            <FormateurDashboard user={user} />
          )}
          {user.role === "client" && (
            <ClientDashboard user={user} />
          )}
          {user.role === "admin" && (
            <AdminDashboard user={user} />
          )}
          {!user.role && (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
              <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center max-w-md mx-auto">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Welcome to FyterLance!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Your account doesn't have a role assigned yet. Please select a role to continue.</p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-6 font-medium">We recommend becoming a Formateur to share your knowledge and skills!</p>
                </div>

                <div className="grid gap-4 mb-6">
                  {/* Formateur button - now first and with a highlight effect */}
                  <button className="group relative w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-4 rounded-lg transition-all overflow-hidden shadow-lg border border-blue-400">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400 opacity-10 rounded-full"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-400 opacity-10 rounded-full"></div>
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <span className="text-lg">Become a Formateur</span>
                    </div>
                    <div className="mt-2 text-xs text-blue-100">Create courses, teach students, and share your expertise</div>
                  </button>

                  <button className="group relative w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 px-4 rounded-lg transition-all overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Become a Freelancer
                    </div>
                  </button>

                  <button className="group relative w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg transition-all overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Become a Client
                    </div>
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full text-red-500 hover:text-red-600 py-2 px-4 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Session Expired</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your session has expired or you are not logged in.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push('/login')}
                className="bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-5 rounded-lg transition-colors flex-1 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Log In
              </button>
              <button
                onClick={() => router.push('/register')}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2.5 px-5 rounded-lg transition-colors flex-1 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Register
              </button>
            </div>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
              Need help? <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

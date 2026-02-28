import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { refreshAccessToken, logoutUser } from '../../lib/auth';
import { GroupCard } from '../ui/GroupCard';
import { PostCard } from '../ui/Post';
import ProfileCard from '../ui/ProfileCrad';
import StatusBox from '../ui/Status';
import Navbar from '../Navbar';

const AdminDashboard = ({ user }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      let newToken = await refreshAccessToken();
      if (!newToken) {
        logoutUser();
        router.push('/login');
      } else {
        setToken(newToken);
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fyter/posts/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [isUpdated]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="py-6">
        {/* Welcome Banner */}
        <div className="dashboard-section bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-700 dark:to-primary-900 mb-6 p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-primary-100">Welcome to the admin dashboard. Here you can manage the platform.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={handleLogout}
                className="bg-primary-800 hover:bg-primary-900 text-white px-4 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className='relative w-full grid grid-cols-1 md:grid-cols-12 gap-6 h-auto'>
          {/* Left Sidebar */}
          <div className='relative md:col-span-3 space-y-6'>
            <aside className='sticky top-4 space-y-6'>
              <div className="card-hover-effect">
                <ProfileCard />
              </div>
              <div className="card-hover-effect">
                <GroupCard />
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <main className='md:col-span-6 space-y-6'>

            {/* Quick Stats */}
            <div className="dashboard-section bg-white dark:bg-gray-800 p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Users</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Services</p>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <StatusBox setUpdated={setIsUpdated} />
            </div>

            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="dashboard-section">
                  <PostCard post={post} setUpdated={setIsUpdated} />
                </div>
              ))
            ) : (
              <div className="dashboard-section bg-white dark:bg-gray-800 p-6 text-center">
                <div className="py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Share your thoughts or work with the community</p>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors">
                    Create Your First Post
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <div className='relative md:col-span-3'>
            <aside className='sticky top-4 space-y-6'>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Quick Links
                  </h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Manage Users
                      </a>
                    </li>
                    <li className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Content Moderation
                      </a>
                    </li>
                    <li className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Site Settings
                      </a>
                    </li>
                    <li className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Analytics
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

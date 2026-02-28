import React from 'react'
import { refreshAccessToken, logoutUser } from '../../lib/auth';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { GroupCard } from '../ui/GroupCard';
import { PostCard } from '../ui/Post';
import ProfileCard from '../ui/ProfileCrad';
import StatusBox from '../ui/Status';
import Navbar from '../Navbar';
import PostFeed from '../Posts/PostFeed';

const ClientDashboard = ({user}) => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/fyter/posts/`, {
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
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Check if this is the user's first login
  const isFirstLogin = user && user.first_login;

  return (
    <div>
      <Navbar />

      {/* First Login Welcome Message */}
      {isFirstLogin && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4 mx-4 mt-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Welcome to Fytrlance!</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                <p>
                  As a Client, you can browse services offered by freelancers, post your own project requests, and manage your projects all from this dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='relative w-full grid grid-cols-8 gap-5 h-auto p-4'>
        {/* Left Sidebar */}
        <div className='relative col-span-2 space-y-4'>
          <aside className='sticky top-4 space-y-4'>
            <ProfileCard />
            <GroupCard />
          </aside>
        </div>

        {/* Main Content */}
        <main className='col-span-4 space-y-4'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div
              onClick={() => router.push('/clabte-client?showCreateForm=true')}
              className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="p-1.5 bg-white/10 rounded-full group-hover:bg-white/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">New Project</h3>
              <p className="text-sm text-white/80">Create a new project and find talented Fytrs</p>
            </div>

            <div
              onClick={() => router.push('/client/projects')}
              className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="p-1.5 bg-white/10 rounded-full group-hover:bg-white/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">My Projects</h3>
              <p className="text-sm text-white/80">Manage your ongoing projects</p>
            </div>
          </div>

          {/* Posts Feed with integrated form for regular posts and service requests */}
          <PostFeed userRole="freelancer" />
        </main>

        {/* Right Sidebar */}
        <div className='relative col-span-2'>
          <aside className='sticky top-4 space-y-4'>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Recent Projects
                </h3>
              </div>
              <div className="p-4">
                {projects && projects.length > 0 ? (
                  <ul className="space-y-2">
                    {projects.map(project => (
                      <li key={project.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                        <a href={`/projects/${project.id}`} className="font-medium text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{project.title}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">No projects yet</p>
                    <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                      Create your first project
                    </button>
                  </div>
                )}
              </div>
            </div>
            <GroupCard />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard

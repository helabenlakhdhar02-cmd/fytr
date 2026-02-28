"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GroupCard } from '../ui/GroupCard'
import ProfileCard from '../ui/ProfileCrad'
import PostFeed from '../Posts/PostFeed'
import React from 'react'
import Navbar from '../Navbar'
import { refreshAccessToken, logoutUser } from '../../lib/auth';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FaEnvelope } from 'react-icons/fa';
import { API_BASE_URL, API_ENDPOINTS, createAuthHeaders } from '../../config/api';

const FreelancerDashboard = ({ user }) => {
  const [services, setServices] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const router = useRouter();



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

  return (
    <div>
      <Navbar />
      <div className="py-6">
        {/* Welcome Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="dashboard-section bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-700 dark:to-primary-900 mb-6 p-6 text-white rounded-xl relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, FYTR!</h1>
                <p className="text-primary-100">Your freelancer dashboard is ready. Here's what's happening today.</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <a href="/submit-work" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Submit Work
                </a>
                <button className="bg-white text-primary-700 hover:bg-primary-50 px-4 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg">
                  Create Service
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Dashboard Grid */}
        <div className='relative w-full max-w-7xl mx-auto grid grid-cols-12 gap-6 h-auto p-4 md:p-6'>
          {/* Left Sidebar */}
          <div className='relative col-span-4 lg:col-span-3 space-y-5'>
            <aside className='sticky top-4 space-y-5'>
              <div className="card-hover-effect">
                <ProfileCard />
              </div>
              <div className="card-hover-effect">
                <GroupCard />
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <main className='col-span-8 md:col-span-5 lg:col-span-6 space-y-6'>
            {/* Quick Stats */}
            <div className="dashboard-section bg-white dark:bg-gray-800 p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{messageCount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Messages</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Earnings</p>
                </div>
              </div>
            </div>

          

         
            {/* Posts Feed */}
            <PostFeed userRole="freelancer" />
          </main>

          {/* Right Sidebar */}
          <div className='hidden md:block md:col-span-3'>
            <aside className='sticky top-4 space-y-6'>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Your Services
                    </h3>
                    <button className="text-primary-600 dark:text-primary-400 text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium">
                      View All
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {services && services.length > 0 ? (
                    <ul className="space-y-2">
                      {services.map(service => (
                        <li key={service.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                          <a href={`/services/${service.id}`} className="font-medium text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors block">{service.title}</a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">No services yet</p>
                      <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                        Create your first service
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Freelancer Stats
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-primary-200 dark:hover:border-primary-800/50 group">
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">0</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800/50 group">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">0</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Clients</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-green-200 dark:hover:border-green-800/50 group">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">0</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Reviews</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-yellow-200 dark:hover:border-yellow-800/50 group">
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform duration-300">0.0</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerDashboard

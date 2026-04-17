"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { GroupCard } from '../../components/ui/GroupCard'
import { PostCard } from '../../components/ui/Post'
import ProfileCard from '../../components/ui/ProfileCrad'
import StatusBox from '../../components/ui/Status'
import TrendingTopics from '../../components/ui/TrendingTopics'
import SuggestedUsers from '../../components/ui/SuggestedUsers'
import SignupPrompt from '../../components/ui/SignupPrompt'

import React from 'react'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { postService } from '../../lib/dataService'

const page = () => {
    const [isUpdated, setIsUpdated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    // Fetch posts from API
    const fetchPosts = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const postsData = await postService.getAll();
        setPosts(Array.isArray(postsData) ? postsData : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }, []);

    // Fetch posts on mount
    useEffect(() => {
      fetchPosts();
    }, [fetchPosts]);

    // Handle updates if needed
    useEffect(() => {
      if (isUpdated) {
        fetchPosts();
        setIsUpdated(false);
      }
    }, [isUpdated, fetchPosts]);

  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <div className='relative w-full max-w-7xl mx-auto grid grid-cols-12 gap-6 h-auto p-4 md:p-6' > {/* grid */}

      {/* Left Sidebar */}
      <div className='relative col-span-4 lg:col-span-3 space-y-5'>
        <aside className='sticky top-4 space-y-5'>
          <ProfileCard />
          {isAuthenticated && <GroupCard />}
        </aside>
      </div>

      {/* Main Content */}
      <main className='col-span-8 md:col-span-5 lg:col-span-6 space-y-6'>
        {/* Signup Prompt - Only show for non-authenticated users */}
        {!isAuthenticated && <SignupPrompt />}

        {/* Status Box - Only show for authenticated users */}
        {isAuthenticated && <StatusBox setUpdated={setIsUpdated} />}

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-10 md:p-12 rounded-xl border border-blue-100 dark:border-blue-800/30 text-center space-y-5 w-full mx-auto mb-8 shadow-md"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Welcome to FyterLance Community!</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">This is where you can connect with other freelancers, share your work, find inspiration, and discover opportunities.</p>
          <div className="flex flex-wrap justify-center gap-4 pt-4 max-w-2xl mx-auto">
            {isAuthenticated ? (
              <>
                <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 text-base font-medium flex items-center gap-2 shadow-sm hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Create Post</span>
                </button>
                <button className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-lg transition-colors duration-300 text-base font-medium flex items-center gap-2 shadow-sm hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span>Explore Feed</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/Academy')}
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 text-base font-medium flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <span>Explore Academy</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* Post Filter Options */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700 mb-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Filter Posts</h3>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm hover:shadow">
              All Posts
            </button>
            <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium shadow-sm hover:shadow">
              Services Offered
            </button>
            <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium shadow-sm hover:shadow">
              Job Opportunities
            </button>
            <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium shadow-sm hover:shadow">
              Tips & Advice
            </button>
            <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium shadow-sm hover:shadow">
              Success Stories
            </button>
          </div>
        </div>

        {/* Posts Container */}
        <div className="space-y-6">
          {isLoading ? (
            // Loading state
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            // Error state
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={() => fetchPosts()}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : posts.length > 0 ? (
            <>
              {/* Display API posts */}
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hover:shadow-xl transition-all duration-300 rounded-lg mb-6 transform hover:-translate-y-1"
                >
                  <PostCard post={post} setUpdated={setIsUpdated} isAuthenticated={isAuthenticated} />
                </motion.div>
              ))}
            </>
          ) : (
            // No posts state
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No posts yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <div className='hidden md:block md:col-span-3'>
        <aside id="right-sidebar" className="sticky top-4 space-y-6">
          {/* Trending Topics */}
          <TrendingTopics />

          {/* Suggested Users (Top Freelancers) */}
          <SuggestedUsers />

          {/* Community Guidelines - Last element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden w-full border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-primary-600 dark:text-primary-400 font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Community Guidelines
              </h3>
            </div>

            {/* Card Body - Scrollable area */}
            <div className="p-4 max-h-[180px] overflow-y-auto custom-scrollbar">
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span>Be respectful and supportive of other members</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span>Share valuable insights and experiences</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span>Give credit when sharing others' work</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span>Report inappropriate content</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span>Follow platform terms of service</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span>Maintain professional communication</span>
                </li>
              </ul>
            </div>

            {/* Card Footer */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 text-center border-t border-gray-100 dark:border-gray-700">
              <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline flex items-center justify-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                View Full Guidelines
              </button>
            </div>
          </motion.div>
        </aside>
      </div>

    </div>
    </div>
  )
}

export default page

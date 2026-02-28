"use client"
import { GroupCard } from "../../../components/ui/GroupCard";
import ProfileBanner from "../../../components/ui/ProfileBanner";
import ProfileCard from "../../../components/ui/ProfileCrad";
import { PostCard } from "../../../components/ui/Post";
import StatusBox from "../../../components/ui/Status";
import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { FaUser, FaHistory, FaEdit, FaCog, FaNewspaper, FaChevronDown, FaBriefcase } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const Page = () => {
  const { user } = useAuth();
  const { userData: userMe } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  // Fetch user posts
  useEffect(() => {
    if (!user || !user.username) return;

    const fetchUserPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/fyter/posts/${user.username}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [user, isUpdated]);

  // Handle post updates
  const handlePostUpdate = () => {
    setIsUpdated(prev => !prev);
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Navbar is properly integrated at the top */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-3 pb-6">
        {/* Profile Banner */}
        <div className="mb-3 rounded-lg overflow-hidden shadow-sm">
          <ProfileBanner />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Left Sidebar */}
          <div className="md:col-span-4 lg:col-span-3 space-y-3">
            <aside className="sticky top-16 space-y-3">
              {/* Profile Card */}
              <div className="transition-all duration-300 hover:shadow-md">
                <ProfileCard />
              </div>

              {/* Navigation Menu */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white text-xs">Dashboard Navigation</h3>
                </div>
                <nav className="p-1.5">
                  <div className="relative">
                    <a
                      href="/dashboard/profile"
                      className="flex items-center gap-2 p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium group"
                      title="View and edit your profile"
                    >
                      <div className="relative">
                        <FaUser className="text-blue-500 text-sm group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      </div>
                      <span className="text-sm">Profile</span>
                    </a>
                    <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-r-md"></div>
                  </div>

                  <a
                    href="/dashboard/feed"
                    className="flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group mt-0.5"
                    title="See your activity feed"
                  >
                    <FaHistory className="text-gray-500 text-sm group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                    <span className="text-sm">Activity Feed</span>
                  </a>

                  <a
                    href="/dashboard/settings"
                    className="flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group mt-0.5"
                    title="Manage your account settings"
                  >
                    <FaCog className="text-gray-500 text-sm group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                    <span className="text-sm">Settings</span>
                  </a>
                </nav>
              </div>

              {/* Groups Card */}
              <div className="transition-all duration-300 hover:shadow-md">
                <GroupCard />
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <main className="md:col-span-8 lg:col-span-9 space-y-3">
            {/* Profile Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Profile Overview</h2>
                <button
                  onClick={() => window.location.href = '/dashboard/edit-profile'}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaEdit className="text-xs" />
                  <span>Edit Profile</span>
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">Account Status</h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Your account is in good standing</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">Email</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{userMe?.email || 'Not available'}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">Profile Completion</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 relative overflow-hidden">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out animate-pulse-subtle"
                          style={{ width: '70%' }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs text-white font-medium px-1.5 py-0.5 bg-blue-600/80 rounded-full">70%</span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Your profile is 70% complete</p>
                        <div className="group relative">
                          <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                            Complete Profile
                          </button>
                          <div className="absolute bottom-full mb-2 right-0 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700 p-2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <p className="mb-1 text-xs">To reach 100%, add:</p>
                            <ul className="list-disc pl-4 space-y-0.5 text-xs">
                              <li>Profile picture</li>
                              <li>Bio description</li>
                              <li>Skills (at least 3)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">Member Since</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">January 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Post Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Share an Update</h2>
              </div>
              <div className="p-4">
                <StatusBox setUpdated={handlePostUpdate} />
              </div>
            </div>

            {/* Services Section - Only for Freelancers */}
            {userMe?.role === 'freelancer' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <FaBriefcase className="text-blue-500 mr-2" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Services</h2>
                  </div>
                  <a
                    href="/dashboard/my-service"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaEdit className="text-xs" />
                    <span>Manage Services</span>
                  </a>
                </div>
                <div className="p-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div>
                      {posts && posts.filter(post => post.type === 'clabte').length > 0 ? (
                        <div className="space-y-4">
                          {posts
                            .filter(post => post.type === 'clabte')
                            .map((post, index) => (
                              <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="hover:shadow-md transition-all duration-300 rounded-lg"
                              >
                                <PostCard post={post} setUpdated={handlePostUpdate} />
                              </motion.div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">You haven't created any services yet.</p>
                          <a
                            href="/dashboard/my-service"
                            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors inline-block"
                          >
                            Create Your First Service
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* User Posts Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <FaNewspaper className="text-blue-500 mr-2" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Posts</h2>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">Sort by:</span>
                  <select className="bg-gray-100 dark:bg-gray-700 border-none rounded px-2 py-1 text-gray-700 dark:text-gray-300 text-xs focus:ring-1 focus:ring-blue-500">
                    <option>Newest</option>
                    <option>Most Liked</option>
                    <option>Most Comments</option>
                  </select>
                </div>
              </div>
              <div className="p-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : posts && posts.filter(post => post.type !== 'clabte').length > 0 ? (
                  <div className="space-y-4">
                    {posts
                      .filter(post => post.type !== 'clabte') // Exclude service posts
                      .map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:shadow-md transition-all duration-300 rounded-lg"
                        >
                          <PostCard post={post} setUpdated={handlePostUpdate} />
                        </motion.div>
                      ))}
                    {posts.length > 5 && (
                      <div className="flex justify-center mt-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium flex items-center">
                          Show More Posts <FaChevronDown className="ml-1" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">You haven't shared any regular posts yet.</p>
                    <button
                      onClick={() => document.querySelector('.status-input')?.click()}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Create Your First Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;

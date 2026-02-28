"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaHistory, FaEdit, FaCog, FaNewspaper, FaChevronDown, FaBriefcase, FaLayerGroup, FaRegNewspaper } from "react-icons/fa";
// Custom toast notification function
const showToast = (message, type = 'success') => {
  // Create a toast element
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white transform transition-all duration-300 opacity-0 translate-y-2`;
  toast.textContent = message;

  // Add to DOM
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  // Remove after delay
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(2px)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
};
import Navbar from "../../../components/Navbar";
import ProfileBanner from "../../../components/ui/ProfileBanner";
import ProfileCard from "../../../components/ui/ProfileCrad";
import ProfileImageUploader from "../../../components/ui/ProfileImageUploader";
import { PostCard } from "../../../components/ui/Post";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";
import { API_BASE_URL } from '../../../config/api';

const ClanteProfilePage = () => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState("regular-posts");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostUpdate = () => {
    // Refresh posts after update
    fetchPosts();
  };

  const fetchPosts = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Filter posts based on active tab
  const filteredPosts = () => {
    if (activeTab === "regular-posts") {
      return posts.filter(post => post.type !== 'clabte');
    } else if (activeTab === "service-posts") {
      return posts.filter(post => post.type === 'clabte');
    }
    return posts;
  };

  // Handle tab change with animation
  const handleTabChange = (tab) => {
    // Add a subtle animation effect when changing tabs
    const contentElement = document.querySelector('.posts-content');
    if (contentElement) {
      // Apply fade out effect
      contentElement.style.opacity = '0';
      contentElement.style.transform = 'translateY(10px)';

      // After a short delay, change the tab and fade back in
      setTimeout(() => {
        setActiveTab(tab);

        // Apply fade in effect
        setTimeout(() => {
          contentElement.style.opacity = '1';
          contentElement.style.transform = 'translateY(0)';
        }, 50);
      }, 200);
    } else {
      // If animation not possible, just change the tab
      setActiveTab(tab);
    }

    // Show a custom notification
    showToast(tab === "regular-posts" ? "Showing regular posts" : "Showing service requests");
  };

  // Sort posts based on selected option
  const sortedPosts = () => {
    const filtered = filteredPosts();

    if (sortOption === "newest") {
      return [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOption === "oldest") {
      return [...filtered].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return filtered;
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Profile</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load your profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Navbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-3 pb-6">
        {/* Hero Section with Profile Banner */}
        <div className="relative mb-6">
          {/* Background Banner with Gradient Overlay */}
          <div className="h-64 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-[url('/photos/banner-bg.jpg')] bg-cover bg-center opacity-50"></div>

            {/* Animated Light Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-purple-400/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Profile Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col md:flex-row items-end md:items-center gap-4">
              {/* Profile Image with Upload Functionality */}
              <ProfileImageUploader
                onImageUpdate={(newImageUrl) => {
                  // This callback will be called when the image is updated
                  console.log('Profile image updated:', newImageUrl);
                  // You could trigger additional actions here if needed
                }}
              />

              {/* Profile Info */}
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-md">
                  {user?.full_name || 'Client Profile'}
                </h1>
                <p className="text-blue-100 text-lg mb-2 drop-shadow-md">
                  {user?.role === 'client' ? 'Clante' : 'User'} • {user?.region || 'Location not specified'}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100/30 text-white backdrop-blur-sm">
                    <FaUser className="mr-1" size={10} /> Client
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100/30 text-white backdrop-blur-sm">
                    <FaHistory className="mr-1" size={10} /> Member since {new Date().getFullYear()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => router.push('/dashboard/edit-profile')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl"
                >
                  <FaEdit size={14} />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <aside className="sticky top-20 space-y-6">
              {/* Profile Stats Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">Profile Overview</h2>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {posts.filter(post => post.type !== 'clabte').length}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Posts</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {posts.filter(post => post.type === 'clabte').length}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Services</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {posts.filter(post => post.status === 'completed').length || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Completed</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {posts.filter(post => post.status === 'in_progress').length || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">In Progress</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">Contact Information</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.email || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.phone || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.region || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">Navigation</h2>
                </div>
                <nav className="p-3">
                  <ul className="space-y-1">
                    <li>
                      <Link href="/dashboard/home" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 group">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-110">
                          <FaUser className="text-lg" />
                        </div>
                        <span className="font-medium">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/clabte-client" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 group">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-110">
                          <FaLayerGroup className="text-lg" />
                        </div>
                        <span className="font-medium">Projects</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/edit-profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 group">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400 transition-all duration-300 group-hover:scale-110">
                          <FaEdit className="text-lg" />
                        </div>
                        <span className="font-medium">Edit Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 group">
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-400 transition-all duration-300 group-hover:scale-110">
                          <FaCog className="text-lg" />
                        </div>
                        <span className="font-medium">Settings</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <main className="md:col-span-8 lg:col-span-9 space-y-6">

            {/* Posts Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              {/* Tabs Navigation */}
              <div className="flex border-b border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => handleTabChange("regular-posts")}
                  className={`relative py-4 px-6 text-center font-medium text-sm flex items-center gap-2 transition-all duration-300 ${
                    activeTab === "regular-posts"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeTab === "regular-posts" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-gray-100 dark:bg-gray-700"} transition-all duration-300`}>
                    <FaRegNewspaper className={`text-lg ${activeTab === "regular-posts" ? "scale-110" : ""} transition-transform duration-300`} />
                  </div>
                  <span>Regular Posts</span>
                  {activeTab === "regular-posts" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => handleTabChange("service-posts")}
                  className={`relative py-4 px-6 text-center font-medium text-sm flex items-center gap-2 transition-all duration-300 ${
                    activeTab === "service-posts"
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeTab === "service-posts" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-gray-100 dark:bg-gray-700"} transition-all duration-300`}>
                    <FaLayerGroup className={`text-lg ${activeTab === "service-posts" ? "scale-110" : ""} transition-transform duration-300`} />
                  </div>
                  <span>Service Requests</span>
                  {activeTab === "service-posts" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 dark:bg-purple-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              </div>

              {/* Sort Options & Actions */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {activeTab === "regular-posts" ? "Your Regular Posts" : "Your Service Requests"}
                  </h3>
                  <div className="ml-3 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium">
                    {filteredPosts().length} {filteredPosts().length === 1 ? 'item' : 'items'}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => {
                        const newSortOption = e.target.value;
                        setSortOption(newSortOption);

                        // Show custom notification for sort change
                        showToast(`Sorted by ${newSortOption === 'newest' ? 'newest first' : 'oldest first'}`);

                        // Add animation effect
                        const contentElement = document.querySelector('.posts-content');
                        if (contentElement) {
                          // Apply subtle animation
                          contentElement.style.opacity = '0.8';
                          contentElement.style.transform = 'translateY(5px)';

                          setTimeout(() => {
                            contentElement.style.opacity = '1';
                            contentElement.style.transform = 'translateY(0)';
                          }, 150);
                        }
                      }}
                      className="appearance-none pl-10 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${sortOption === 'newest' ? 'rotate-0' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/dashboard/home')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Post
                  </button>
                </div>
              </div>

              {/* Posts Content */}
              <div className="p-5 posts-content transition-all duration-300" style={{ opacity: 1, transform: 'translateY(0)' }}>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 relative">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your content...</p>
                  </div>
                ) : sortedPosts().length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {sortedPosts().map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="relative">
                          {/* Post Type Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              post.type === 'clabte'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {post.type === 'clabte' ? 'Service' : 'Regular Post'}
                            </span>
                          </div>

                          {/* Status Badge for Services */}
                          {post.type === 'clabte' && post.status && (
                            <div className="absolute top-4 right-4 z-10">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                post.status === 'completed'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : post.status === 'in_progress'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                              }`}>
                                {post.status === 'completed'
                                  ? 'Completed'
                                  : post.status === 'in_progress'
                                    ? 'In Progress'
                                    : 'Pending'}
                              </span>
                            </div>
                          )}

                          <PostCard post={post} setUpdated={handlePostUpdate} />
                        </div>

                        {/* Additional Service Info */}
                        {post.type === 'clabte' && (
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Deadline: {new Date(post.deadline || Date.now()).toLocaleDateString()}</span>
                              </div>
                              <Link href={`/clabte-client?id=${post.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                                Manage
                              </Link>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                      {activeTab === "regular-posts" ? (
                        <FaRegNewspaper className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                      ) : (
                        <FaLayerGroup className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No posts found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      {activeTab === "regular-posts"
                        ? "You haven't created any regular posts yet. Share your thoughts and experiences with the community."
                        : "You haven't created any service requests yet. Start by creating a new service request."}
                    </p>
                    <button
                      onClick={() => router.push('/dashboard/home')}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create your first {activeTab === "regular-posts" ? "post" : "service request"}
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

export default ClanteProfilePage;

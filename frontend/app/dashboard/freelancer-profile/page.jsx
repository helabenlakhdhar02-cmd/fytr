"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUser, FaHistory, FaEdit, FaCog, FaNewspaper, FaChevronDown, FaBriefcase,
  FaLayerGroup, FaRegNewspaper, FaEye, FaEyeSlash, FaStar, FaCertificate,
  FaGraduationCap, FaAward, FaTrophy, FaCode, FaLaptopCode, FaProjectDiagram,
  FaCalendarAlt, FaLink, FaExternalLinkAlt, FaPlus
} from "react-icons/fa";
import AddPostModel from "../../../components/Pages/AddPostModel";
import { API_BASE_URL } from '../../../config/api';

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
import { getJustFreelancerServices } from "../../../lib/auth";
const FreelancerProfilePage = () => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState("services");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const [visibilitySettings, setVisibilitySettings] = useState({});
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeSection, setActiveSection] = useState("posts"); // 'posts', 'certifications', 'portfolio'
  const [services, setServices] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);

  // Add this function to handle post creation
  const handleCreatePost = async (postData) => {
    if (!user || !user.username) {
      showToast('You must be logged in to create a post', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('username', user.username);
      
      // Add images if any
      if (postData.images && postData.images.length > 0) {
        postData.images.forEach(image => {
          formData.append('files', image);
        });
      }
      
      const response = await fetch(`${API_BASE_URL}/fyter/posts/`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        showToast('Post created successfully!');
        fetchPosts(); // Refresh posts
      } else {
        const errorData = await response.json();
        showToast(`Failed to create post: ${errorData.detail || 'Unknown error'}`, 'error');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      showToast('Error creating post', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !user.username) return; // wait for user.username

    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const servicesData = await getJustFreelancerServices(user.username);
        setServices(servicesData);
        console.log('Freelancer services fetched:', servicesData);
      } catch (error) {
        console.error('Error fetching freelancer services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [user]);



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch posts
        const postsResponse = await fetch(`${API_BASE_URL}/fyter/posts/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData);

          // Initialize visibility settings
          const initialSettings = {};
          postsData.forEach(post => {
            initialSettings[post.id] = post.visibility || true;
          });
          setVisibilitySettings(initialSettings);
        } else {
          console.error('Failed to fetch posts');
        }

        // Get certifications from user data if available
        if (user && user.certifications) {
          setCertifications(user.certifications);
        } else {
          // Fallback to mock data
          setCertifications([
            {
              id: 1,
              title: "React Developer Certification",
              institution: "Meta",
              issue_date: "2023-05-15",
              expiry_date: null,
              credential_id: "CERT-12345",
              credential_url: "https://example.com/cert/12345"
            },
            {
              id: 2,
              title: "Full Stack Web Development",
              institution: "Coursera",
              issue_date: "2022-11-20",
              expiry_date: "2025-11-20",
              credential_id: "CERT-67890",
              credential_url: "https://example.com/cert/67890"
            }
          ]);
        }

        // Get projects from user data if available
        if (user && user.projects) {
          setProjects(user.projects);
        } else {
          // Fallback to mock data
          setProjects([
            {
              id: 1,
              title: "E-commerce Website",
              description: "A fully responsive e-commerce platform with payment integration",
              technologies: "React, Node.js, MongoDB",
              image: "/photos/projects/project1.jpg",
              link: "https://example.com/project1",
              completed_date: "2023-06-10"
            },
            {
              id: 2,
              title: "Task Management App",
              description: "A productivity app for managing tasks and projects",
              technologies: "React Native, Firebase",
              image: "/photos/projects/project2.jpg",
              link: "https://example.com/project2",
              completed_date: "2023-03-22"
            },
            {
              id: 3,
              title: "Portfolio Website",
              description: "A personal portfolio website with dark mode and animations",
              technologies: "Next.js, Tailwind CSS",
              image: "/photos/projects/project3.jpg",
              link: "https://example.com/project3",
              completed_date: "2022-12-15"
            }
          ]);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);
  





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
 

  // Function to handle section changes
  const handleSectionChange = (section) => {
    if (section === activeSection) return;

    // Add animation effect
    const contentElement = document.querySelector('.main-content');
    if (contentElement) {
      // Apply fade out effect
      contentElement.style.opacity = '0';
      contentElement.style.transform = 'translateY(10px)';

      // After a short delay, change the section and fade back in
      setTimeout(() => {
        setActiveSection(section);

        // Apply fade in effect
        setTimeout(() => {
          contentElement.style.opacity = '1';
          contentElement.style.transform = 'translateY(0)';
        }, 50);
      }, 200);
    } else {
      // If animation not possible, just change the section
      setActiveSection(section);
    }

    // Show notification
    showToast(`Showing ${section} section`);
  };

  // Function to add a new certification
  const handleAddCertification = () => {
    // Create a modal or form to add a new certification
    const title = prompt("Enter certification title:");
    if (!title) return;

    const institution = prompt("Enter institution name:");
    if (!institution) return;

    const issue_date = prompt("Enter issue date (YYYY-MM-DD):");
    if (!issue_date) return;

    // Create a new certification object
    const newCertification = {
      id: certifications.length > 0 ? Math.max(...certifications.map(c => c.id)) + 1 : 1,
      title,
      institution,
      issue_date,
      expiry_date: null,
      credential_id: prompt("Enter credential ID (optional):") || null,
      credential_url: prompt("Enter credential URL (optional):") || null
    };

    // Add the new certification to the list
    const updatedCertifications = [...certifications, newCertification];
    setCertifications(updatedCertifications);

    // Update user data with the new certification
    if (user) {
      const updatedUser = { ...user, certifications: updatedCertifications };
      updateUserData(updatedUser);
    }

    showToast("Certification added successfully!");
  };

  // Function to add a new project
  const handleAddProject = () => {
    // Create a modal or form to add a new project
    const title = prompt("Enter project title:");
    if (!title) return;

    const description = prompt("Enter project description:");
    if (!description) return;

    const technologies = prompt("Enter technologies used (comma separated):");
    if (!technologies) return;

    // Create a new project object
    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      title,
      description,
      technologies,
      image, // Default image
      link: prompt("Enter project link (optional):") || null,
      completed_date: prompt("Enter completion date (YYYY-MM-DD):") || new Date().toISOString().split('T')[0]
    };

    // Add the new project to the list
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);

    // Update user data with the new project
    if (user) {
      const updatedUser = { ...user, projects: updatedProjects };
      updateUserData(updatedUser);
    }

    showToast("Project added successfully!");
  };

  // Toggle post visibility
  const toggleVisibility = async (postId) => {
    try {
      // Optimistically update UI
      const newVisibility = !visibilitySettings[postId];
      setVisibilitySettings(prev => ({
        ...prev,
        [postId]: newVisibility
      }));

      // Show custom notification
      showToast(`Post visibility ${newVisibility ? 'public' : 'private'}`);

      // In a real app, this would make an API call to update the post visibility
      // API call simulation with timeout
      const updateVisibility = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log(`API call: Updated visibility for post ${postId} to ${newVisibility}`);
            resolve({ success: true });
          }, 500);
        });
      };

      await updateVisibility();

      // If we wanted to refresh data from server after update:
      // await fetchPosts();
    } catch (error) {
      // Revert the optimistic update if the API call fails
      setVisibilitySettings(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));

      showToast("Failed to update visibility. Please try again.", "error");
      console.error("Error updating post visibility:", error);
    }
  };

  // Filter posts based on active tab
  const filteredPosts = () => {
    if (activeTab === "services") {
      return services; // Use services data when on services tab
    } else if (activeTab === "regular-posts") {
      return posts.filter(post => post.type !== 'clabte');
    }
    return posts;
  };

  // Handle tab change with animation
  const handleTabChange = (tab) => {
    if (tab === activeTab) return; // Don't do anything if clicking the active tab

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

    // Show custom notification
    showToast(tab === "services" ? "Showing service offerings" : "Showing regular posts");
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-[url('/photos/banner-bg.jpg')] bg-cover bg-center opacity-50"></div>

            {/* Animated Light Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-400/20 rounded-full filter blur-3xl animate-pulse"></div>
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
                  {user?.full_name || 'Freelancer Profile'}
                </h1>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(user?.role_details?.rate || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300/50'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-white font-medium">
                    {user?.role_details?.rate ? parseFloat(user.role_details.rate).toFixed(1) : '0.0'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100/30 text-white backdrop-blur-sm">
                    <FaStar className="mr-1" size={10} /> {user?.role_details?.level || 'Beginner'}
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
                <Link href={`/freelancer/${user?.id || 'profile'}`} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl">
                  <FaEye size={14} />
                  <span>Public View</span>
                </Link>
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
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
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
                        {user?.role_details?.projects_completed || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Completed</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {user?.role_details?.rate ? parseFloat(user.role_details.rate).toFixed(1) : '0.0'}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills & Expertise */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">Skills & Expertise</h2>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {user?.role_details?.skills ? (
                      user.role_details.skills.split(',').map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
                        >
                          {skill.trim()}
                        </span>
                      ))
                    ) : (
                      <div className="text-center w-full py-4">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No skills specified</p>
                        <button
                          onClick={() => router.push('/dashboard/profile/edit')}
                          className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                        >
                          Add your skills
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">About Me</h2>
                </div>
                <div className="p-5">
                  {user?.role_details?.bio ? (
                    <p className="text-gray-700 dark:text-gray-300">
                      {user.role_details.bio}
                    </p>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No bio specified</p>
                      <button
                        onClick={() => router.push('/dashboard/profile/edit')}
                        className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                      >
                        Add your bio
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">Profile Stats</h2>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaRegNewspaper className="text-indigo-600 dark:text-indigo-400" />
                        <span className="text-gray-700 dark:text-gray-300">Posts & Services</span>
                      </div>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full text-xs font-medium">
                        {posts.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaProjectDiagram className="text-green-600 dark:text-green-400" />
                        <span className="text-gray-700 dark:text-gray-300">Portfolio Projects</span>
                      </div>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                        {projects.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaCertificate className="text-amber-600 dark:text-amber-400" />
                        <span className="text-gray-700 dark:text-gray-300">Certifications</span>
                      </div>
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-medium">
                        {certifications.length}
                      </span>
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
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 transition-all duration-300 group-hover:scale-110">
                          <FaUser className="text-lg" />
                        </div>
                        <span className="font-medium">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/clabte-freelancer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 group">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-110">
                          <FaLayerGroup className="text-lg" />
                        </div>
                        <span className="font-medium">Service Management</span>
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
                      <Link href="/dashboard/ranked" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 group">
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-400 transition-all duration-300 group-hover:scale-110">
                          <FaStar className="text-lg" />
                        </div>
                        <span className="font-medium">FYTR Dashboard</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <main className="md:col-span-8 lg:col-span-9 space-y-6 main-content" style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.3s, transform 0.3s' }}>

            {/* Conditional rendering based on active section */}
            {/* Main Tabs - Always Visible */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl mb-6">
              <div className="border-b-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-2 rounded-t-xl">
                <div className="flex overflow-x-auto gap-2">
                  <button
                    onClick={() => {
                      setActiveSection('posts');
                      handleTabChange("services");
                    }}
                    className={`relative py-4 px-8 text-center font-medium text-sm transition-all duration-300 ${
                      activeSection === 'posts' && activeTab === "services"
                        ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-white dark:bg-gray-800 shadow-md"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaLayerGroup className={`text-lg ${activeSection === 'posts' && activeTab === "services" ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                      <span>Service Offerings</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setActiveSection('posts');
                      handleTabChange("regular-posts");
                    }}
                    className={`relative py-4 px-8 text-center font-medium text-sm transition-all duration-300 ${
                      activeSection === 'posts' && activeTab === "regular-posts"
                        ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-gray-800 shadow-md"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaRegNewspaper className={`text-lg ${activeSection === 'posts' && activeTab === "regular-posts" ? "text-purple-600 dark:text-purple-400" : ""}`} />
                      <span>Regular Posts</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleSectionChange("portfolio")}
                    className={`relative py-4 px-8 text-center font-medium text-sm transition-all duration-300 ${
                      activeSection === "portfolio"
                        ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 bg-white dark:bg-gray-800 shadow-md"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaProjectDiagram className={`text-lg ${activeSection === "portfolio" ? "text-green-600 dark:text-green-400" : ""}`} />
                      <span>Portfolio</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleSectionChange("certifications")}
                    className={`relative py-4 px-8 text-center font-medium text-sm transition-all duration-300 ${
                      activeSection === "certifications"
                        ? "text-amber-600 dark:text-amber-400 border-b-2 border-amber-600 dark:border-amber-400 bg-white dark:bg-gray-800 shadow-md"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaCertificate className={`text-lg ${activeSection === "certifications" ? "text-amber-600 dark:text-amber-400" : ""}`} />
                      <span>Certifications</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {activeSection === 'posts' && (
            /* Posts Content */
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">

              {/* Sort Options & Actions */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {activeTab === "services" ? "Your Service Offerings" : "Your Regular Posts"}
                  </h3>
                  <div className="ml-3 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium">
                    {filteredPosts().length} {filteredPosts().length === 1 ? 'item' : 'items'}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none pl-10 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/dashboard/home')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New {activeTab === "services" ? "Service" : "Post"}
                  </button>
                </div>
              </div>

              {/* Posts Content */}
              <div className="p-5 posts-content transition-all duration-300" style={{ opacity: 1, transform: 'translateY(0)' }}>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 relative">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
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
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
                      >
                        {/* Visibility Controls */}
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                          {activeTab !== "services" && (
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              visibilitySettings[post.id]
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                            }`}>
                              {visibilitySettings[post.id] ? 'Public' : 'Private'}
                            </div>
                          )}
                        </div>

                        {/* Post Type Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            activeTab === "services"
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          }`}>
                            {activeTab === "services" ? 'Service' : 'Regular Post'}
                          </span>
                        </div>

                        <div className="pt-12">
                          {activeTab === "services" ? (
                            <div className="p-4">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.description}</p>
                              
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">DT {post.price}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Price</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">{post.category}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Category</div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.technologies.split(',').map((tech, i) => (
                                  <span
                                    key={i}
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
                                  >
                                    {tech.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <PostCard post={post} setUpdated={handlePostUpdate} />
                          )}
                        </div>

                        {/* Additional Service Info & Actions */}
                        {activeTab === "services" && (
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <div className="flex items-center">
                              <img
                                src={post.freelancer?.user?.profileImg || "/fighterfish.png"}
                                alt={post.freelancer?.user?.full_name || "Freelancer"}
                                className="w-8 h-8 rounded-full mr-2"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/fighterfish.png";
                                }}
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {post.freelancer?.user?.full_name || "Freelancer"}
                              </span>
                            </div>
                            <Link
                              href={`/services/${post.id}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                            >
                              <FaExternalLinkAlt className="mr-1" size={12} />
                              View Details
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                      {activeTab === "services" ? (
                        <FaLayerGroup className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                      ) : (
                        <FaRegNewspaper className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No posts found </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      {activeTab === "services"
                        ? "You haven't created any service offerings yet. Start by creating a new service to showcase your skills to potential clients."
                        : "You haven't created any regular posts yet. Share your thoughts, projects, and experiences with the community."}
                    </p>
                    <button
                      onClick={() => router.push('/dashboard/home')}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create your first {activeTab === "services" ? "service offering" : "post"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            )}

            {/* Certifications Section */}
            {activeSection === 'certifications' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg flex items-center">
                  <FaCertificate className="mr-2 text-purple-500" />
                  Your Certifications
                </h2>
                <button
                  onClick={handleAddCertification}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <FaPlus className="mr-1.5" size={12} />
                  Add Certification
                </button>
              </div>

              <div className="p-5">
                {certifications.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          {/* Certificate Icon */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                              <FaGraduationCap size={32} />
                            </div>
                          </div>

                          {/* Certificate Details */}
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {cert.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Issued by {cert.institution} • {new Date(cert.issue_date).toLocaleDateString()}
                              {cert.expiry_date && ` • Expires: ${new Date(cert.expiry_date).toLocaleDateString()}`}
                            </p>
                            {cert.credential_id && (
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                Credential ID: {cert.credential_id}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex-shrink-0 flex gap-2">
                            {cert.credential_url && (
                              <a
                                href={cert.credential_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
                              >
                                <FaExternalLinkAlt className="mr-1.5" size={12} />
                                Verify
                              </a>
                            )}
                            <button
                              onClick={() => router.push(`/dashboard/certifications/edit/${cert.id}`)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
                            >
                              <FaEdit className="mr-1.5" size={12} />
                              Edit
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <FaCertificate className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No certifications yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      Showcase your skills and expertise by adding professional certifications to your profile.
                    </p>
                    <button
                      onClick={handleAddCertification}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <FaPlus className="mr-2" size={14} />
                      Add Your First Certification
                    </button>
                  </div>
                )}
              </div>
            </div>
            )}

            {/* Portfolio Projects Section */}
            {activeSection === 'portfolio' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg flex items-center">
                  <FaProjectDiagram className="mr-2 text-green-500" />
                  Your Portfolio
                </h2>
                <button
                  onClick={handleAddProject}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FaPlus className="mr-1.5" size={12} />
                  Add Project
                </button>
              </div>

              <div className="p-5">
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                      >
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.image || "/photos/projects/default-project.jpg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/photos/projects/default-project.jpg";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 w-full">
                              <div className="flex justify-between items-center">
                                <span className="text-white text-sm font-medium">
                                  {new Date(project.completed_date).toLocaleDateString()}
                                </span>
                                <div className="flex gap-2">
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors duration-300"
                                    >
                                      <FaExternalLinkAlt size={14} />
                                    </a>
                                  )}
                                  <button
                                    onClick={() => router.push(`/dashboard/portfolio/edit/${project.id}`)}
                                    className="p-1.5 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors duration-300"
                                  >
                                    <FaEdit size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.split(',').map((tech, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                      <FaProjectDiagram className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No portfolio projects yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      Showcase your work by adding projects to your portfolio. This helps clients see your capabilities and previous work.
                    </p>
                    <button
                      onClick={handleAddProject}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FaPlus className="mr-2" size={14} />
                      Add Your First Project
                    </button>
                  </div>
                )}
              </div>
            </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfilePage;

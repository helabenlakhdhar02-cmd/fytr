/*  */"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser, FaEdit, FaCog, FaNewspaper, FaChevronDown, FaBriefcase,
  FaLayerGroup, FaRegNewspaper, FaEye, FaEyeSlash, FaStar, FaCertificate,
  FaGraduationCap, FaAward, FaTrophy, FaCode, FaLaptopCode, FaProjectDiagram,
  FaCalendarAlt, FaLink, FaExternalLinkAlt, FaPlus, FaChalkboardTeacher, FaUsers, FaBook,
  FaCamera, FaLinkedin, FaGlobe, FaTwitter
} from "react-icons/fa";

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

const TrainerProfile = () => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState("courses");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const [visibilitySettings, setVisibilitySettings] = useState({});
  const [certifications, setCertifications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeSection, setActiveSection] = useState('courses'); // 'courses', 'certifications', 'posts'

  // Sample mock data for courses
  const mockCourses = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      thumbnail: '/photos/Academy/full.png',
      students: 450,
      rating: 4.8,
      price: 199.99,
      duration: '12 weeks',
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'React.js Masterclass',
      thumbnail: '/photos/Academy/react.jpeg',
      students: 320,
      rating: 4.9,
      price: 149.99,
      duration: '8 weeks',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      thumbnail: '/photos/Academy/figma.png',
      students: 280,
      rating: 4.7,
      price: 129.99,
      duration: '6 weeks',
      level: 'Beginner'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch posts
        const postsResponse = await fetch(`http://localhost:8000/fyter/posts/`, {
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

        // Fetch certifications
        try {
          const certResponse = await fetch(`http://localhost:8000/fyter/certifications/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (certResponse.ok) {
            const certData = await certResponse.json();
            setCertifications(certData);
          }
        } catch (error) {
          console.error('Error fetching certifications:', error);
          // Use mock data for certifications if API fails
          setCertifications([
            {
              id: 1,
              title: 'Certified Web Development Instructor',
              issuer: 'International Web Academy',
              date: '2020-06-15',
              image: '/photos/Academy/cert1.jpg'
            },
            {
              id: 2,
              title: 'Advanced JavaScript Teaching Certification',
              issuer: 'JavaScript Foundation',
              date: '2019-03-10',
              image: '/photos/Academy/cert2.jpg'
            }
          ]);
        }

        // For courses, we'll use mock data for now
        setCourses(mockCourses);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle tab change with animation
  const handleTabChange = (tab) => {
    if (tab === activeTab) return; // Don't do anything if clicking the active tab

    // Add a subtle animation effect when changing tabs
    const contentElement = document.querySelector('.courses-content');
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
      // Just change the tab
      setActiveTab(tab);
    }

    // Show custom notification
    showToast(tab === "courses" ? "Showing courses" : tab === "certifications" ? "Showing certifications" : "Showing posts");
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

  // Function to add a new course
  const handleAddCourse = () => {
    // Create a modal or form to add a new course
    const title = prompt("Enter course title:");
    if (!title) return;

    const level = prompt("Enter course level (Beginner, Intermediate, Advanced):");
    if (!level) return;

    const price = prompt("Enter course price:");
    if (!price) return;

    // Create a new course object
    const newCourse = {
      id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
      title,
      level,
      price: parseFloat(price),
      thumbnail: "/photos/Academy/default-course.jpg", // Default image
      students: 0,
      rating: 0,
      duration: prompt("Enter course duration (e.g., 8 weeks):") || "8 weeks"
    };

    // Add the new course to the list
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);

    showToast("Course added successfully!");
  };

  if (userLoading || isLoading) {
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
          <div className="h-72 rounded-xl overflow-hidden relative">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/80 to-purple-600/90"></div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/photos/banner-bg.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>

            {/* Animated Light Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-indigo-400/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple-400/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0">
              <svg className="absolute right-0 top-0 h-full w-1/3 text-white/5" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,0 100,0 100,100" />
              </svg>
            </div>

            {/* Profile Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row items-end md:items-center gap-6">
              {/* Profile Image with Upload Functionality */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                <div className="relative">
                  <ProfileImageUploader
                    onImageUpdate={(newImageUrl) => {
                      console.log('Profile image updated:', newImageUrl);
                    }}
                  />
                </div>
              </div>

              {/* Profile Info - Simplified */}
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-md">
                  {user?.full_name || 'Trainer Profile'}
                </h1>

                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white/10 text-white backdrop-blur-sm">
                    {user?.role_details?.level || 'Beginner'} Trainer
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white/10 text-white backdrop-blur-sm">
                    {user?.role_details?.completed_projects || 0} Projects
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white/10 text-white backdrop-blur-sm">
                    {courses.reduce((total, course) => total + (course.students || 0), 0)} Students
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/dashboard/edit-profile')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg"
                >
                  <FaEdit size={14} />
                  <span>Edit Profile</span>
                </button>
                <Link
                  href={`/trainer/${user?.id || 'profile'}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg"
                >
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
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {courses.length}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Courses</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {courses.reduce((total, course) => total + (course.students || 0), 0)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Students</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {certifications.length}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Certifications</div>
                    </div>
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
                        className="mt-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors text-sm"
                      >
                        Add Bio
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">Quick Links</h2>
                </div>
                <div className="p-3">
                  <div className="space-y-1">
                    <Link href="/dashboard/home" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaLayerGroup className="text-blue-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Dashboard</span>
                    </Link>
                    <Link href="/dashboard/project-requests" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaProjectDiagram className="text-purple-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Project Requests</span>
                      <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                    </Link>
                    <Link href="/dashboard/active-projects" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaProjectDiagram className="text-indigo-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Active Projects</span>
                    </Link>
                    <Link href="/dashboard/services" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaBriefcase className="text-teal-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">My Services</span>
                    </Link>
                    <Link href="/dashboard/courses" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaBook className="text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">My Courses</span>
                    </Link>
                    <Link href="/dashboard/students" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaUsers className="text-purple-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">My Students</span>
                    </Link>
                    <Link href="/dashboard/certifications" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaCertificate className="text-yellow-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Certifications</span>
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaCog className="text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Settings</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            {/* Tabs Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => handleTabChange('courses')}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'courses'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaBook className="inline-block mr-2" />
                    Courses
                  </button>
                  <button
                    onClick={() => handleTabChange('certifications')}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'certifications'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaCertificate className="inline-block mr-2" />
                    Certifications
                  </button>
                  <button
                    onClick={() => handleTabChange('posts')}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'posts'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaRegNewspaper className="inline-block mr-2" />
                    Posts
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 courses-content" style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.3s, transform 0.3s' }}>
                {activeTab === 'courses' && (
                  <div>
                    {/* Courses Header with Add Button */}
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Courses</h2>
                      <button
                        onClick={handleAddCourse}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                      >
                        <FaPlus size={14} />
                        <span>Add Course</span>
                      </button>
                    </div>

                    {/* Courses Grid */}
                    {courses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {courses.map(course => (
                          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                              <div className="absolute top-2 right-2">
                                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                                  {course.level}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>

                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center mr-3">
                                    <FaUsers className="mr-1" />
                                    {course.students} students
                                  </div>
                                  <div className="flex items-center">
                                    <FaStar className="mr-1 text-yellow-500" />
                                    {course.rating}
                                  </div>
                                </div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                  ${course.price}
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Duration: {course.duration}
                                </span>
                                <div className="flex gap-2">
                                  <Link
                                    href={`/courses/${course.id}`}
                                    className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                  >
                                    View
                                  </Link>
                                  <button
                                    className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                  >
                                    <FaEdit size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <FaBook className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          You haven't created any courses yet. Start by creating a new course to share your knowledge with students.
                        </p>
                        <button
                          onClick={handleAddCourse}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                        >
                          <FaPlus className="inline-block mr-2" size={12} />
                          Create Your First Course
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'certifications' && (
                  <div>
                    {/* Certifications Header */}
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Certifications</h2>
                      <button
                        onClick={() => router.push('/dashboard/certifications/add')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                      >
                        <FaPlus size={14} />
                        <span>Add Certification</span>
                      </button>
                    </div>

                    {/* Certifications Grid */}
                    {certifications.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {certifications.map(cert => (
                          <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
                            <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              {cert.image ? (
                                <img
                                  src={cert.image}
                                  alt={cert.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FaCertificate className="text-6xl text-gray-300 dark:text-gray-600" />
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Issued by {cert.issuer}</p>
                              <p className="text-gray-500 dark:text-gray-500 text-xs">{cert.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <FaCertificate className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No certifications found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          You haven't added any certifications yet. Add your professional certifications to showcase your expertise.
                        </p>
                        <button
                          onClick={() => router.push('/dashboard/certifications/add')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                        >
                          <FaPlus className="inline-block mr-2" size={12} />
                          Add Your First Certification
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'posts' && (
                  <div>
                    {/* Posts Header */}
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Posts</h2>
                      <button
                        onClick={() => router.push('/dashboard/posts/create')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                      >
                        <FaPlus size={14} />
                        <span>Create Post</span>
                      </button>
                    </div>

                    {/* Posts List */}
                    {posts.length > 0 ? (
                      <div className="space-y-6">
                        {posts.map(post => (
                          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
                            <div className="p-6">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.content?.substring(0, 150)}...</p>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-500">
                                  {new Date(post.created_at).toLocaleDateString()}
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                  >
                                    View
                                  </button>
                                  <button
                                    className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                  >
                                    <FaEdit size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <FaRegNewspaper className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No posts found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          You haven't created any posts yet. Share your knowledge and insights with the community.
                        </p>
                        <button
                          onClick={() => router.push('/dashboard/posts/create')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                        >
                          <FaPlus className="inline-block mr-2" size={12} />
                          Create Your First Post
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;

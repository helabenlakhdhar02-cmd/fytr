"use client"
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaStar, FaLayerGroup, FaRegNewspaper, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaUser, FaCheck, FaCertificate, FaGraduationCap,
  FaProjectDiagram, FaExternalLinkAlt
} from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import { PostCard } from "../../../components/ui/Post";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";

const FreelancerPublicProfile = ({ params }) => {
  const router = useRouter();
  const { userData: currentUser, loading: userLoading } = useUser();
  const [freelancer, setFreelancer] = useState(null);
  const [posts, setPosts] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("services");

  // Check for tab parameter in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam && ['services', 'regular-posts', 'portfolio', 'certifications'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const pathname = usePathname();
  const freelancerId = pathname.split('/').pop();

  useEffect(() => {
    const fetchFreelancerData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to get the freelancer's data
        // For now, we'll use mock data
        const mockFreelancer = {
          id: freelancerId,
          full_name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1 (555) 123-4567",
          region: "New York, USA",
          profileImg: "/photos/Topfreelancers/freelancer1.PNG",
          role: "freelancer",
          role_details: {
            level: "Veiltail",
            rate: 4.8,
            skills: "Web Development, React, Next.js, UI/UX Design",
            bio: "Experienced web developer with 5+ years of experience in creating responsive, user-friendly websites and applications. Specialized in React and Next.js development with a strong focus on performance optimization and clean code.",
            projects_completed: 27,
            portfolio_link: "https://johnsmith-portfolio.example.com"
          }
        };

        setFreelancer(mockFreelancer);

        // Fetch posts (in a real app, this would be filtered by freelancer ID and visibility)
        const mockPosts = [
          {
            id: 1,
            title: "Professional Website Development",
            description: "I will create a modern, responsive website for your business using React and Next.js. The website will be optimized for search engines and will load quickly on all devices.",
            type: "clabte",
            created_at: "2023-11-15T10:30:00Z",
            user: {
              id: freelancerId,
              full_name: "John Smith",
              profileImg: "/photos/Topfreelancers/freelancer1.PNG"
            },
            visibility: true,
            price: 250,
            delivery_time: "7 days"
          },
          {
            id: 2,
            title: "Custom Web Application Development",
            description: "Need a custom web application? I can build it for you using the latest technologies. From e-commerce platforms to complex dashboards, I can handle it all.",
            type: "clabte",
            created_at: "2023-11-10T14:45:00Z",
            user: {
              id: freelancerId,
              full_name: "John Smith",
              profileImg: "/photos/Topfreelancers/freelancer1.PNG"
            },
            visibility: true,
            price: 500,
            delivery_time: "14 days"
          },
          {
            id: 3,
            title: "Just finished an amazing project!",
            description: "I'm excited to share my latest project - a fully responsive e-commerce website with a custom checkout process. Check out the screenshots!",
            type: "regular",
            created_at: "2023-11-05T09:15:00Z",
            user: {
              id: freelancerId,
              full_name: "John Smith",
              profileImg: "/photos/Topfreelancers/freelancer1.PNG"
            },
            visibility: true
          }
        ];

        setPosts(mockPosts);

        // Check if mockFreelancer has certifications
        if (mockFreelancer && mockFreelancer.certifications) {
          setCertifications(mockFreelancer.certifications);
        } else {
          // Fallback to mock certifications data
          const mockCertifications = [
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
          ];
          setCertifications(mockCertifications);
        }

        // Check if mockFreelancer has projects
        if (mockFreelancer && mockFreelancer.projects) {
          setProjects(mockFreelancer.projects);
        } else {
          // Fallback to mock portfolio projects data
          const mockProjects = [
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
          ];
          setProjects(mockProjects);
        }
      } catch (error) {
        console.error('Error fetching freelancer data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreelancerData();
  }, [freelancerId]);

  // Filter posts based on active tab and visibility
  const filteredPosts = () => {
    if (!posts) return [];

    return posts.filter(post => {
      // Only show visible posts
      if (!post.visibility) return false;

      if (activeTab === "services") {
        return post.type === 'clabte';
      } else if (activeTab === "regular-posts") {
        return post.type !== 'clabte';
      }
      return true;
    });
  };

  // Handle tab change with animation
  const handleTabChange = (tab) => {
    if (tab === activeTab) return; // Don't do anything if clicking the active tab

    // Add a subtle animation effect when changing tabs
    const contentElement = document.querySelector('.tab-content');
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

    // Add haptic feedback if available
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50); // Subtle vibration for 50ms
    }
  };

  // Check if the current user has hired this freelancer before
  const hasHiredBefore = () => {
    // In a real app, this would check if there are any completed projects between the current user and the freelancer
    return false;
  };

  const handleContactRequest = () => {
    if (currentUser) {
      // Add animation effect
      if (showContactInfo) {
        // If already showing, hide with animation
        const contactInfoElement = document.querySelector('.contact-info-modal');
        if (contactInfoElement) {
          contactInfoElement.style.opacity = '0';
          contactInfoElement.style.transform = 'translateY(-10px)';

          setTimeout(() => {
            setShowContactInfo(false);
          }, 300);
        } else {
          setShowContactInfo(false);
        }
      } else {
        // Show contact info
        setShowContactInfo(true);

        // Scroll to contact info after a short delay
        setTimeout(() => {
          const contactInfoElement = document.querySelector('.contact-info-modal');
          if (contactInfoElement) {
            contactInfoElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }
    } else {
      // Show a more user-friendly notification instead of an alert
      const loginNotification = document.createElement('div');
      loginNotification.className = 'fixed top-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      loginNotification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Please log in to contact this freelancer</span>
        </div>
      `;
      document.body.appendChild(loginNotification);

      // Remove the notification after 3 seconds
      setTimeout(() => {
        loginNotification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(loginNotification);
        }, 300);
      }, 3000);
    }
  };

  const handleHireNow = (serviceId) => {
    if (currentUser) {
      // Add a loading effect to the button
      const hireButton = event.currentTarget;
      const originalContent = hireButton.innerHTML;

      hireButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      `;
      hireButton.disabled = true;

      // Simulate processing delay
      setTimeout(() => {
        // In a real app, this would redirect to a page to create a new project with this freelancer
        router.push(`/hire-freelancer/${freelancerId}?service=${serviceId || ''}`);
      }, 800);
    } else {
      // Show a more user-friendly notification instead of an alert
      const loginNotification = document.createElement('div');
      loginNotification.className = 'fixed top-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      loginNotification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Please log in to hire this freelancer</span>
        </div>
      `;
      document.body.appendChild(loginNotification);

      // Add CSS animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `;
      document.head.appendChild(style);

      // Remove the notification after 3 seconds
      setTimeout(() => {
        loginNotification.style.opacity = '0';
        loginNotification.style.transform = 'translateY(-20px)';
        loginNotification.style.transition = 'opacity 0.3s, transform 0.3s';
        setTimeout(() => {
          document.body.removeChild(loginNotification);
          document.head.removeChild(style);
        }, 300);
      }, 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Profile</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load the freelancer's profile...</p>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Freelancer Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The freelancer you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/dashboard/home')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Back Home
          </button>
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
              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-xl z-10">
                  <img
                    src={freelancer.profileImg || "/photos/Topfreelancers/freelancer1.PNG"}
                    alt={freelancer.full_name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white rounded-full p-2 shadow-lg">
                  <FaStar size={16} />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-md">
                  {freelancer.full_name}
                </h1>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(freelancer.role_details.rate)
                            ? 'text-yellow-400'
                            : 'text-gray-300/50'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-white font-medium">
                    {freelancer.role_details.rate.toFixed(1)}
                  </span>
                  <span className="mx-2 text-white/70">•</span>
                  <span className="text-white/90">
                    {freelancer.role_details.projects_completed} completed projects
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100/30 text-white backdrop-blur-sm">
                    <FaStar className="mr-1" size={10} /> {freelancer.role_details.level}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100/30 text-white backdrop-blur-sm">
                    <FaMapMarkerAlt className="mr-1" size={10} /> {freelancer.region}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleContactRequest}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl"
                >
                  <FaEnvelope size={14} />
                  <span>Contact</span>
                </button>
                <button
                  onClick={() => handleHireNow()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaUser size={14} />
                  <span>Hire Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Modal */}
        {showContactInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="contact-info-modal bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 mb-6 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <pattern id="contact-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                  <circle cx="5" cy="5" r="1" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#contact-pattern)" />
              </svg>
            </div>

            <div className="flex justify-between items-center mb-4 relative z-10">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 mr-3">
                  <FaEnvelope className="h-5 w-5" />
                </span>
                Contact Information
              </h3>
              <button
                onClick={handleContactRequest}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 mr-3">
                  <FaEnvelope className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{freelancer.email}</div>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400 mr-3">
                  <FaPhone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{freelancer.phone}</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-blue-700 dark:text-blue-400">Tip</span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  You can also message this freelancer directly through the Fytrlance platform for faster responses and to keep all project communication in one place.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleHireNow()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaUser className="mr-2" size={14} />
                  Hire Now
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">About</h2>
              </div>
              <div className="p-5">
                <p className="text-gray-700 dark:text-gray-300">
                  {freelancer.role_details.bio}
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Skills & Expertise</h2>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {freelancer.role_details.skills.split(',').map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Stats & Achievements</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {freelancer.role_details.projects_completed}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Projects Completed</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {freelancer.role_details.rate.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Rating</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {filteredPosts().filter(post => post.type === 'clabte').length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Services</div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {freelancer.role_details.level}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="md:col-span-8 lg:col-span-9 space-y-6">


            {/* Main Tabs - Always Visible */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl mb-6">
              <div className="border-b-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-2 rounded-t-xl">
                <div className="flex overflow-x-auto gap-2">
                  <button
                    onClick={() => handleTabChange("services")}
                    className={`relative py-4 px-8 text-center font-medium text-sm transition-all duration-300 ${
                      activeTab === "services"
                        ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-white dark:bg-gray-800 shadow-md"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaLayerGroup className={`text-lg ${activeTab === "services" ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                      <span>Service Offerings</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleTabChange("regular-posts")}
                    className={`relative py-4 px-8 text-center font-medium text-sm transition-all duration-300 ${
                      activeTab === "regular-posts"
                        ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-gray-800 shadow-md"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaRegNewspaper className={`text-lg ${activeTab === "regular-posts" ? "text-purple-600 dark:text-purple-400" : ""}`} />
                      <span>Regular Posts</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleTabChange("portfolio")}
                    className={`relative py-4 px-8 text-center font-medium text-sm transition-all duration-300 ${
                      activeTab === "portfolio"
                        ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 bg-white dark:bg-gray-800 shadow-md"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaProjectDiagram className={`text-lg ${activeTab === "portfolio" ? "text-green-600 dark:text-green-400" : ""}`} />
                      <span>Portfolio</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleTabChange("certifications")}
                    className={`relative py-4 px-8 text-center font-medium text-sm transition-all duration-300 ${
                      activeTab === "certifications"
                        ? "text-amber-600 dark:text-amber-400 border-b-2 border-amber-600 dark:border-amber-400 bg-white dark:bg-gray-800 shadow-md"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaCertificate className={`text-lg ${activeTab === "certifications" ? "text-amber-600 dark:text-amber-400" : ""}`} />
                      <span>Certifications</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">

              {/* Tab Content */}
              <div className="p-5 tab-content transition-all duration-300" style={{ opacity: 1, transform: 'translateY(0)' }}>
                {/* Services Tab */}
                {activeTab === "services" && (
                  <>
                    {filteredPosts().length > 0 ? (
                      <div className="grid grid-cols-1 gap-6">
                        {filteredPosts().map((post, index) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
                          >
                            <div className="relative">
                              {/* Post Type Badge */}
                              <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                  Service
                                </span>
                              </div>

                              {/* Service Hire Button */}
                              <div className="absolute top-4 right-4 z-10">
                                <button
                                  onClick={() => handleHireNow(post.id)}
                                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
                                >
                                  Hire for DT {post.price}
                                </button>
                              </div>

                              <div className="pt-12">
                                <PostCard post={post} />
                              </div>

                              {/* Additional Service Info */}
                              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <FaCalendarAlt className="mr-1.5" />
                                    <span>Delivery in {post.delivery_time}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <FaCheck className="mr-1.5 text-green-500" />
                                    <span>Available Now</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 px-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                          <FaLayerGroup className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No services available</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          This freelancer hasn't published any service offerings yet. Check back later or contact them directly to inquire about their services.
                        </p>
                        <button
                          onClick={handleContactRequest}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <FaEnvelope className="mr-2" />
                          Contact Freelancer
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Regular Posts Tab */}
                {activeTab === "regular-posts" && (
                  <>
                    {filteredPosts().length > 0 ? (
                      <div className="grid grid-cols-1 gap-6">
                        {filteredPosts().map((post, index) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
                          >
                            <div className="relative">
                              {/* Post Type Badge */}
                              <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                  Post
                                </span>
                              </div>

                              <div className="pt-12">
                                <PostCard post={post} />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 px-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                          <FaRegNewspaper className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No posts available</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          This freelancer hasn't published any posts yet. Check out their services or contact them directly.
                        </p>
                        <button
                          onClick={() => setActiveTab("services")}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <FaLayerGroup className="mr-2" />
                          View Services
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Portfolio Tab */}
                {activeTab === "portfolio" && (
                  <>
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
                      <div className="text-center py-16 px-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                          <FaProjectDiagram className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No portfolio projects</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          This freelancer hasn't added any portfolio projects yet. Check out their services or contact them directly.
                        </p>
                        <button
                          onClick={() => setActiveTab("services")}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <FaLayerGroup className="mr-2" />
                          View Services
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Certifications Tab */}
                {activeTab === "certifications" && (
                  <>
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
                                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400">
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
                              <div className="flex-shrink-0">
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
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 px-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                          <FaCertificate className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No certifications</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          This freelancer hasn't added any certifications yet. Check out their services or contact them directly.
                        </p>
                        <button
                          onClick={() => setActiveTab("services")}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <FaLayerGroup className="mr-2" />
                          View Services
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FreelancerPublicProfile;

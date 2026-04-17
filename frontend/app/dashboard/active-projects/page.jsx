"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser, FaHistory, FaEdit, FaCog, FaNewspaper, FaChevronDown, FaBriefcase,
  FaLayerGroup, FaRegNewspaper, FaEye, FaEyeSlash, FaStar, FaCertificate,
  FaGraduationCap, FaAward, FaTrophy, FaCode, FaLaptopCode, FaProjectDiagram,
  FaCalendarAlt, FaLink, FaExternalLinkAlt, FaPlus, FaChalkboardTeacher, FaUsers, FaBook,
  FaCamera, FaLinkedin, FaGlobe, FaTwitter, FaCheckCircle, FaTimesCircle, FaClock,
  FaFileAlt, FaComments, FaMoneyBillWave, FaTasks, FaFileUpload
} from "react-icons/fa";

import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";

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

const ActiveProjects = () => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState("active");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, you would fetch projects from the API
        // For now, we'll use mock data
        setProjects(mockProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Get filtered projects based on active tab
  const getFilteredProjects = () => {
    switch (activeTab) {
      case 'active':
        return projects.filter(p => p.status === 'in_progress');
      case 'pending':
        return projects.filter(p => p.status === 'pending_review');
      case 'completed':
        return projects.filter(p => p.status === 'completed');
      default:
        return projects;
    }
  };

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <FaClock className="mr-1" size={10} />
            In Progress
          </span>
        );
      case 'pending_review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <FaFileAlt className="mr-1" size={10} />
            Pending Review
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <FaCheckCircle className="mr-1" size={10} />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            Unknown
          </span>
        );
    }
  };

  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Projects</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage and track all your training projects in one place
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/dashboard/trainer-profile"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaUser className="mr-2 -ml-1" />
              Back to Profile
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => handleTabChange('active')}
                className={`${
                  activeTab === 'active'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                <FaClock className="inline-block mr-2" />
                In Progress
              </button>
              <button
                onClick={() => handleTabChange('pending')}
                className={`${
                  activeTab === 'pending'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                <FaFileAlt className="inline-block mr-2" />
                Pending Review
              </button>
              <button
                onClick={() => handleTabChange('completed')}
                className={`${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                <FaCheckCircle className="inline-block mr-2" />
                Completed
              </button>
            </nav>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-6">
          {getFilteredProjects().length > 0 ? (
            getFilteredProjects().map(project => (
              <div key={project.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">{project.title}</h2>
                    {getStatusBadge(project.status)}
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                      
                      {/* Progress bar for in-progress projects */}
                      {project.status === 'in_progress' && (
                        <div className="mt-2 mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Progress</span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Feedback for completed projects */}
                      {project.status === 'completed' && project.feedback && (
                        <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Feedback:</h4>
                          <p className="text-sm italic text-gray-600 dark:text-gray-400">{project.feedback}</p>
                          {project.rating && (
                            <div className="flex items-center mt-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= Math.floor(project.rating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {project.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center mb-4">
                          <img 
                            src={project.client.avatar} 
                            alt={project.client.name}
                            className="w-10 h-10 rounded-full mr-3"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{project.client.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Budget:</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">${project.budget}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Deadline:</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">{new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Last Update:</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">{new Date(project.lastUpdate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col space-y-2">
                        <Link
                          href={`/project-details/${project.id}`}
                          className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FaEye className="mr-2 -ml-1" size={14} />
                          View Details
                        </Link>
                        
                        {project.status === 'in_progress' && (
                          <button
                            onClick={() => router.push(`/dashboard/submit-work/${project.id}`)}
                            className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <FaFileUpload className="mr-2 -ml-1" size={14} />
                            Submit Work
                          </button>
                        )}
                        
                        <button
                          onClick={() => router.push(`/dashboard/messages/${project.id}`)}
                          className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FaComments className="mr-2 -ml-1" size={14} />
                          Message Client
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
              <FaProjectDiagram className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No projects found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {activeTab === 'active' ? "You don't have any active projects at the moment." :
                 activeTab === 'pending' ? "You don't have any projects pending review." :
                 "You don't have any completed projects yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveProjects;

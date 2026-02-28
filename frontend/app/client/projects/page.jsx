'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar';
import { 
  FaArrowLeft, 
  FaComments, 
  FaClock, 
  FaSearch,
  FaSort, 
  FaFilter,
  FaCheckCircle, 
  FaUser, 
  FaUsers,
  FaPlus
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { useUser } from "../../../context/UserContext";
import { API_BASE_URL, API_ENDPOINTS, createAuthHeaders } from '../../../config/api';

const ClientProjectsPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { userData: user1, loading: userLoading } = useUser();

   // Fetch posts and services from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get the username from user context
        const username = user1?.usernam || user1?.username;
        
        if (!username) {
          console.error('Username not available');
          setIsLoading(false);
          return;
        }

        // Fetch client projects by username without authentication headers
        const projectsResponse = await fetch(`${API_BASE_URL}/fyter/client/projects/${username}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData);
        } else {
          console.error('Failed to fetch projects:', projectsResponse.status);
          
          // Try with authentication as fallback
          const accessToken = Cookies.get('access_token');
          if (accessToken) {
            const authResponse = await fetch(`${API_BASE_URL}/fyter/client/projects/${username}/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              }
            });
            
            if (authResponse.ok) {
              const projectsData = await authResponse.json();
              setProjects(projectsData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading && !userLoading) {
      fetchData();
    }
  }, [user, user1, loading, userLoading]);
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter projects
  const filteredProjects = () => {
    let filtered = [...projects];

    if (activeTab !== 'all') {
      filtered = filtered.filter(project => project.type === activeTab);
    }

    if (activeStatusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === activeStatusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <FaClock className="mr-1" size={10} />
            Pending
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <FaClock className="mr-1" size={10} />
            In Progress
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
        return null;
    }
  };

  // Get type badge
  const getTypeBadge = (type) => {
    switch (type) {
      case 'soloFin':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            <FaUser className="mr-1" size={10} />
            SoloFin
          </span>
        );
      case 'bettaArena':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
            <FaUsers className="mr-1" size={10} />
            BettaArena
          </span>
        );
      default:
        return null;
    }
  };

  // Show loading state
  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/client/dashboard"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 mb-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                My Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                Manage all your projects in one place. Track progress, communicate with freelancers, and review submissions for both SoloFin and BettaArena projects.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/dashboard/post-service"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <FaPlus className="mr-2" size={16} />
                Create New Project
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                  <FaUser size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-4">
                  <FaClock size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.filter(p => p.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
                  <FaCheckCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.filter(p => p.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                  <FaComments size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    DT {projects.reduce((total, project) => total + (project.status === 'completed' ? project.price : 0), 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects().length > 0 ? (
            filteredProjects().map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        {getStatusBadge(project.status || 'pending')}
                        {getTypeBadge(project.type || 'soloFin')}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <FaClock className="mr-1" />
                          <span>Deadline: {project.deadline ? formatDate(project.deadline) : 'Not set'}</span>
                        </div>
                        <div className="flex items-center">
                          <span>Budget: ${project.budget || 'Not set'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/project-details?id=${project.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No projects found matching your criteria.</p>
              <Link
                href="/dashboard/post-service"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FaPlus className="mr-2" /> Post a New Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProjectsPage;

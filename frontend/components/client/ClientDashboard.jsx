'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaClipboardList,
  FaUsers,
  FaRegClock,
  FaRegCalendarAlt,
  FaRegBell,
  FaChartLine,
  FaPlus,
  FaSearch,
  FaFilter,
  FaEllipsisH,
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes
} from 'react-icons/fa';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const ClientDashboard = ({ client }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Generate chart data
  const generateChartData = () => {
    // Project status distribution for pie chart
    const statusData = {
      labels: ['In Progress', 'Pending', 'Completed'],
      datasets: [
        {
          data: [
            projects.filter(p => p.status === 'in-progress').length,
            projects.filter(p => p.status === 'pending').length,
            projects.filter(p => p.status === 'completed').length,
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Monthly projects data for line chart
    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Projects Posted',
          data: [2, 3, 1, 4, 2, 3],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Projects Completed',
          data: [1, 2, 1, 3, 1, 2],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
      ],
    };

    // Budget allocation for bar chart
    const budgetData = {
      labels: ['Web Dev', 'Design', 'Marketing', 'Mobile Dev', 'Content'],
      datasets: [
        {
          label: 'Budget Allocation ($)',
          data: [2500, 1200, 800, 3500, 600],
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };

    return { statusData, monthlyData, budgetData };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'gray',
          font: {
            size: 12
          }
        }
      }
    }
  };

  // Mock notifications
  useEffect(() => {
    // In a real app, this would come from an API
    const mockNotifications = [
      {
        id: 1,
        type: 'info',
        message: 'Your project "Website Redesign" is 65% complete',
        time: '2 hours ago',
        read: false
      },
      {
        id: 2,
        type: 'success',
        message: 'Ahmed Hassan has delivered the first milestone for "Website Redesign"',
        time: '1 day ago',
        read: false
      },
      {
        id: 3,
        type: 'warning',
        message: 'The deadline for "Mobile App Development" is approaching in 5 days',
        time: '2 days ago',
        read: true
      },
      {
        id: 4,
        type: 'info',
        message: 'You have 7 new applicants for "Mobile App Development"',
        time: '3 days ago',
        read: true
      },
      {
        id: 5,
        type: 'success',
        message: 'Your project "Logo Design" has been completed successfully',
        time: '1 week ago',
        read: true
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-500" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Filter projects based on search and filters
  const filterProjects = () => {
    return projects.filter(project => {
      // Search term filter
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

      // Date filter (simplified for demo)
      let matchesDate = true;
      if (dateFilter === 'recent') {
        // Assuming recent means last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        matchesDate = new Date(project.deadline) >= sevenDaysAgo;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: 'Website Redesign',
      status: 'in-progress',
      deadline: '2023-12-15',
      budget: '$1,200',
      freelancer: {
        name: 'Ahmed Hassan',
        avatar: '/fighterfish.png',
        rating: 4.8
      },
      progress: 65,
      unreadMessages: 3
    },
    {
      id: 2,
      title: 'Mobile App Development',
      status: 'pending',
      deadline: '2024-01-20',
      budget: '$3,500',
      freelancer: null,
      progress: 0,
      applicants: 7,
      unreadMessages: 0
    },
    {
      id: 3,
      title: 'Logo Design',
      status: 'completed',
      deadline: '2023-11-05',
      budget: '$350',
      freelancer: {
        name: 'Leila Mahmoud',
        avatar: '/fighterfish.png',
        rating: 4.9
      },
      progress: 100,
      unreadMessages: 0
    }
  ];

  // Mock data for hired freelancers
  const hiredFreelancers = [
    {
      id: 101,
      name: 'Ahmed Hassan',
      avatar: '/fighterfish.png',
      specialty: 'Web Development',
      rating: 4.8,
      projectsCompleted: 12,
      currentProject: 'Website Redesign'
    },
    {
      id: 102,
      name: 'Leila Mahmoud',
      avatar: '/fighterfish.png',
      specialty: 'Graphic Design',
      rating: 4.9,
      projectsCompleted: 8,
      currentProject: null
    }
  ];

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Format status text
  const formatStatus = (status) => {
    switch(status) {
      case 'in-progress':
        return 'In Progress';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {client?.name || 'Client'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your projects and freelancers
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3 items-center">
            <Link
              href="/clabte-client"
              className="flex items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
            >
              <FaPlus className="mr-2" size={14} />
              Create New Service Request
            </Link>

            <Link
              href="/fytrs"
              className="flex items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <FaSearch className="mr-2" size={14} />
              Find Freelancers
            </Link>

            {/* Analytics button hidden */}
            {/* <Link
              href="/clante/analytics"
              className="flex items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <FaChartLine className="mr-2" size={14} />
              Analytics
            </Link> */}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center py-4 px-6 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FaChartLine className="mr-2" size={16} />
              Overview
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center py-4 px-6 text-sm font-medium ${
                activeTab === 'projects'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FaClipboardList className="mr-2" size={16} />
              Projects
            </button>

            <button
              onClick={() => setActiveTab('freelancers')}
              className={`flex items-center py-4 px-6 text-sm font-medium ${
                activeTab === 'freelancers'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FaUsers className="mr-2" size={16} />
              My Freelancers
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Stats Cards */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Projects</h3>
                      <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-full">
                        <FaClipboardList className="text-blue-600 dark:text-blue-400" size={18} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {projects.filter(p => p.status === 'in-progress').length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {projects.filter(p => p.status === 'pending').length} pending approval
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hired Freelancers</h3>
                      <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-full">
                        <FaUsers className="text-green-600 dark:text-green-400" size={18} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {hiredFreelancers.length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {hiredFreelancers.filter(f => f.currentProject).length} currently working
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completed Projects</h3>
                      <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-full">
                        <FaRegCalendarAlt className="text-purple-600 dark:text-purple-400" size={18} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {projects.filter(p => p.status === 'completed').length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Total budget: $1,550
                    </p>
                  </div>
                </div>



                {/* Recent Projects */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h3>
                    <Link
                      href="#"
                      onClick={() => setActiveTab('projects')}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      View all
                    </Link>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Project
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Deadline
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Budget
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {projects.slice(0, 2).map((project) => (
                          <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {project.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {project.freelancer ? `Assigned to ${project.freelancer.name}` : 'Unassigned'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                {formatStatus(project.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {new Date(project.deadline).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {project.budget}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={`/project-details?id=${project.id}`}
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                {/* Projects content will go here */}
                <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Projects</h3>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search projects..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" size={16} />
                      </div>
                      <button
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() => document.getElementById('filter-panel').classList.toggle('hidden')}
                      >
                        <FaFilter size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Advanced Filter Panel */}
                  <div id="filter-panel" className="hidden bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Status
                        </label>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="all">All Statuses</option>
                          <option value="in-progress">In Progress</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Date
                        </label>
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="all">All Time</option>
                          <option value="recent">Recent (7 days)</option>
                          <option value="month">This Month</option>
                          <option value="quarter">This Quarter</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Sort By
                        </label>
                        <select
                          className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="budget-high">Budget (High to Low)</option>
                          <option value="budget-low">Budget (Low to High)</option>
                          <option value="deadline">Deadline (Soonest)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 mr-2"
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                          setDateFilter('all');
                        }}
                      >
                        Reset
                      </button>
                      <button
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
                        onClick={() => document.getElementById('filter-panel').classList.add('hidden')}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project list will go here */}
                <div className="space-y-4">
                  {filterProjects().map((project) => (
                    <div
                      key={project.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mr-3">
                              {project.title}
                            </h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                              {formatStatus(project.status)}
                            </span>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <FaRegCalendarAlt className="mr-1" size={14} />
                            <span className="mr-4">Due: {new Date(project.deadline).toLocaleDateString()}</span>
                            <span>{project.budget}</span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {project.freelancer ? (
                            <div className="flex items-center mr-4">
                              <img
                                src={project.freelancer.avatar}
                                alt={project.freelancer.name}
                                className="w-8 h-8 rounded-full mr-2"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/fighterfish.png";
                                }}
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {project.freelancer.name}
                              </span>
                            </div>
                          ) : (
                            <div className="mr-4 text-sm text-yellow-600 dark:text-yellow-400">
                              {project.applicants} applicants
                            </div>
                          )}

                          <Link
                            href={`/project-details?id=${project.id}`}
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm"
                          >
                            Manage
                          </Link>
                        </div>
                      </div>

                      {project.status === 'in-progress' && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'freelancers' && (
              <div>
                {/* Freelancers content will go here */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Freelancers</h3>
                  <Link
                    href="/fytrs"
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm"
                  >
                    Find New Freelancers
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hiredFreelancers.map((freelancer) => (
                    <div
                      key={freelancer.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <img
                          src={freelancer.avatar}
                          alt={freelancer.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />

                        <div className="ml-4 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {freelancer.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {freelancer.specialty}
                              </p>
                            </div>

                            <div className="flex">
                              <Link
                                href={`/messages?user=${freelancer.id}`}
                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                <FaRegBell size={16} />
                              </Link>
                              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                <FaEllipsisH size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 flex items-center text-sm">
                            <div className="flex items-center text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(freelancer.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-gray-600 dark:text-gray-400">{freelancer.rating}</span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">
                              {freelancer.projectsCompleted} projects completed
                            </span>
                          </div>

                          {freelancer.currentProject && (
                            <div className="mt-3 text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Currently working on: </span>
                              <span className="font-medium text-gray-900 dark:text-white">{freelancer.currentProject}</span>
                            </div>
                          )}

                          <div className="mt-4 flex space-x-2">
                            <Link
                              href={`/freelancer/${freelancer.id}`}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              View Profile
                            </Link>
                            <Link
                              href={`/messages?user=${freelancer.id}`}
                              className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30"
                            >
                              Message
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

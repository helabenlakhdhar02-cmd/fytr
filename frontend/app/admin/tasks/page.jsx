'use client';

import { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaUser,
  FaFileAlt,
  FaComments,
  FaStar
} from 'react-icons/fa';
import Link from 'next/link';

export default function TasksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock task data
  const mockTasks = [
    {
      id: 1,
      title: 'Homepage UI Design',
      projectId: 1,
      projectTitle: 'E-commerce Website Redesign',
      submittedBy: {
        id: 101,
        name: 'John Doe',
        role: 'UI Designer',
        img: '/fighterfish.png'
      },
      status: 'pending_review',
      submittedAt: '2023-11-28T14:30:00',
      dueDate: '2023-12-05',
      description: 'Completed homepage design with responsive layouts for all screen sizes.',
      attachments: 3,
      comments: 2
    },
    {
      id: 2,
      title: 'Database Schema Implementation',
      projectId: 4,
      projectTitle: 'Database Optimization',
      submittedBy: {
        id: 110,
        name: 'Michael Chen',
        role: 'Database Engineer',
        img: '/fighterfish.png'
      },
      status: 'approved',
      submittedAt: '2023-11-25T09:15:00',
      dueDate: '2023-11-30',
      description: 'Implemented optimized database schema with proper indexing and query structures.',
      attachments: 2,
      comments: 5
    },
    {
      id: 3,
      title: 'SEO Keyword Research',
      projectId: 6,
      projectTitle: 'SEO Optimization Campaign',
      submittedBy: {
        id: 118,
        name: 'Robert Johnson',
        role: 'SEO Specialist',
        img: '/fighterfish.png'
      },
      status: 'pending_review',
      submittedAt: '2023-11-27T16:45:00',
      dueDate: '2023-12-02',
      description: 'Completed keyword research with competitor analysis and opportunity assessment.',
      attachments: 1,
      comments: 0
    },
    {
      id: 4,
      title: 'Product Page Templates',
      projectId: 1,
      projectTitle: 'E-commerce Website Redesign',
      submittedBy: {
        id: 101,
        name: 'John Doe',
        role: 'UI Designer',
        img: '/fighterfish.png'
      },
      status: 'rejected',
      submittedAt: '2023-11-20T11:30:00',
      dueDate: '2023-11-25',
      description: 'Product page templates with various layout options.',
      attachments: 4,
      comments: 8
    },
    {
      id: 5,
      title: 'Query Optimization',
      projectId: 4,
      projectTitle: 'Database Optimization',
      submittedBy: {
        id: 112,
        name: 'Lisa Wong',
        role: 'Backend Developer',
        img: '/fighterfish.png'
      },
      status: 'approved',
      submittedAt: '2023-11-22T13:20:00',
      dueDate: '2023-11-28',
      description: 'Optimized database queries for improved performance.',
      attachments: 1,
      comments: 3
    }
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Format date to relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const badgeClasses = {
      pending_review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    };

    const statusLabels = {
      pending_review: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected',
      in_progress: 'In Progress'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[status] || badgeClasses.pending_review}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Review trainer submissions
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search submissions..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending_review">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading submissions...</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={task.submittedBy.img}
                          alt={task.submittedBy.name}
                          className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <FaFileAlt className="mr-1" />
                            Project: {task.projectTitle}
                          </span>
                          <span className="flex items-center">
                            <FaUser className="mr-1" />
                            By: {task.submittedBy.name}
                          </span>
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      {task.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <StatusBadge status={task.status} />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Submitted {formatRelativeTime(task.submittedAt)}
                      </span>
                      <span className="text-xs flex items-center text-gray-500 dark:text-gray-400">
                        <FaFileAlt className="mr-1" />
                        {task.attachments} attachment{task.attachments !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs flex items-center text-gray-500 dark:text-gray-400">
                        <FaComments className="mr-1" />
                        {task.comments} comment{task.comments !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center gap-2">
                    <Link
                      href={`/admin/tasks/${task.id}`}
                      className="w-full px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                    >
                      <FaEye className="mr-1" />
                      <span>View</span>
                    </Link>
                    {task.status === 'pending_review' && (
                      <>
                        <button className="w-full px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-center">
                          <FaCheck className="mr-1" />
                          <span>Approve</span>
                        </button>
                        <button className="w-full px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center">
                          <FaTimes className="mr-1" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && filteredTasks.length === 0 && (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No submissions found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

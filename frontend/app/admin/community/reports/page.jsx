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
  FaFlag,
  FaComments,
  FaBan,
  FaTrash,
  FaEnvelope
} from 'react-icons/fa';
import Link from 'next/link';

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock report data
  const mockReports = [
    {
      id: 1,
      type: 'user',
      status: 'pending',
      reason: 'inappropriate_behavior',
      description: 'This user has been sending harassing messages in project discussions.',
      reportedAt: '2023-11-28T14:30:00',
      reportedBy: {
        id: 301,
        name: 'John Smith',
        email: 'john.smith@example.com',
        img: '/fighterfish.png'
      },
      reportedUser: {
        id: 305,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        img: '/fighterfish.png'
      },
      contentId: null,
      contentType: null,
      contentPreview: null
    },
    {
      id: 2,
      type: 'content',
      status: 'resolved',
      reason: 'copyright_violation',
      description: 'This course contains copyrighted material from my website without permission.',
      reportedAt: '2023-11-27T10:15:00',
      reportedBy: {
        id: 310,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        img: '/fighterfish.png'
      },
      reportedUser: {
        id: 205,
        name: 'David Chen',
        email: 'david.chen@example.com',
        img: '/fighterfish.png'
      },
      contentId: 2,
      contentType: 'course',
      contentPreview: 'Advanced Machine Learning Specialization'
    },
    {
      id: 3,
      type: 'content',
      status: 'pending',
      reason: 'inappropriate_content',
      description: 'This post contains offensive language and inappropriate images.',
      reportedAt: '2023-11-26T16:45:00',
      reportedBy: {
        id: 315,
        name: 'Jennifer Wilson',
        email: 'jennifer.wilson@example.com',
        img: '/fighterfish.png'
      },
      reportedUser: {
        id: 320,
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com',
        img: '/fighterfish.png'
      },
      contentId: 45,
      contentType: 'post',
      contentPreview: 'Check out this new design technique that I...'
    },
    {
      id: 4,
      type: 'user',
      status: 'dismissed',
      reason: 'spam',
      description: 'This user is spamming promotional content across multiple projects.',
      reportedAt: '2023-11-25T09:30:00',
      reportedBy: {
        id: 325,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        img: '/fighterfish.png'
      },
      reportedUser: {
        id: 330,
        name: 'Thomas Anderson',
        email: 'thomas.anderson@example.com',
        img: '/fighterfish.png'
      },
      contentId: null,
      contentType: null,
      contentPreview: null
    },
    {
      id: 5,
      type: 'content',
      status: 'pending',
      reason: 'misleading_information',
      description: 'This project description is misleading and does not accurately represent the work required.',
      reportedAt: '2023-11-24T13:20:00',
      reportedBy: {
        id: 335,
        name: 'Lisa Wong',
        email: 'lisa.wong@example.com',
        img: '/fighterfish.png'
      },
      reportedUser: {
        id: 340,
        name: 'James Miller',
        email: 'james.miller@example.com',
        img: '/fighterfish.png'
      },
      contentId: 23,
      contentType: 'project',
      contentPreview: 'Database Optimization Project'
    }
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setReports(mockReports);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter reports based on search query and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.contentPreview && report.contentPreview.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesType = filterType === 'all' || report.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
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
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      dismissed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      escalated: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };

    const statusLabels = {
      pending: 'Pending',
      resolved: 'Resolved',
      dismissed: 'Dismissed',
      escalated: 'Escalated'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[status] || badgeClasses.pending}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  // Reason badge component
  const ReasonBadge = ({ reason }) => {
    const badgeClasses = {
      inappropriate_behavior: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      copyright_violation: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      inappropriate_content: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      spam: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      misleading_information: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    };

    const reasonLabels = {
      inappropriate_behavior: 'Inappropriate Behavior',
      copyright_violation: 'Copyright Violation',
      inappropriate_content: 'Inappropriate Content',
      spam: 'Spam',
      misleading_information: 'Misleading Information'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[reason] || badgeClasses.spam}`}>
        {reasonLabels[reason] || reason}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage user reports
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
              placeholder="Search reports..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
                <option value="escalated">Escalated</option>
              </select>
            </div>

            <div className="flex items-center ml-0 md:ml-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="user">User Reports</option>
                <option value="content">Content Reports</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading reports...</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <FaFlag className="text-red-600 dark:text-red-400" />
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusBadge status={report.status} />
                          <ReasonBadge reason={report.reason} />
                          {report.type === 'content' && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {report.contentType.charAt(0).toUpperCase() + report.contentType.slice(1)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-2">
                          {report.type === 'user' ? 'User Report' : `${report.contentType.charAt(0).toUpperCase() + report.contentType.slice(1)} Report`}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {report.description}
                        </p>
                        {report.contentPreview && (
                          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Content: </span>
                            {report.contentPreview}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center">
                        <div className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Reported:</div>
                        <img
                          src={report.reportedUser.img}
                          alt={report.reportedUser.name}
                          className="h-6 w-6 rounded-full object-cover border border-gray-200 dark:border-gray-700 mr-1"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{report.reportedUser.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">By:</div>
                        <img
                          src={report.reportedBy.img}
                          alt={report.reportedBy.name}
                          className="h-6 w-6 rounded-full object-cover border border-gray-200 dark:border-gray-700 mr-1"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{report.reportedBy.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="mr-1" />
                        {formatRelativeTime(report.reportedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center gap-2">
                    <Link
                      href={`/admin/community/reports/${report.id}`}
                      className="w-full px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                    >
                      <FaEye className="mr-1" />
                      <span>View</span>
                    </Link>
                    {report.status === 'pending' && (
                      <>
                        <button className="w-full px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-center">
                          <FaCheck className="mr-1" />
                          <span>Resolve</span>
                        </button>
                        <button className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                          <FaTimes className="mr-1" />
                          <span>Dismiss</span>
                        </button>
                        {report.type === 'user' && (
                          <button className="w-full px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center">
                            <FaBan className="mr-1" />
                            <span>Ban User</span>
                          </button>
                        )}
                        {report.type === 'content' && (
                          <button className="w-full px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center">
                            <FaTrash className="mr-1" />
                            <span>Remove</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && filteredReports.length === 0 && (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No reports found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  FaHistory,
  FaUserPlus,
  FaUserEdit,
  FaUserSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaCog,
  FaBook,
  FaMoneyBillWave,
  FaFilter,
  FaCalendarAlt,
  FaSearch
} from 'react-icons/fa';
import Link from 'next/link';
import { useAdminActivity } from '../../../context/AdminActivityContext';

import { AdminActivityProvider } from '../../../context/AdminActivityContext';

function ActivityLogContent() {
  const { activities, isLoaded } = useAdminActivity();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Load activities from context
  useEffect(() => {
    if (isLoaded) {
      setFilteredActivities(activities);
      setIsLoading(false);
    }
  }, [activities, isLoaded]);

  // Filter activities based on search, type, and date range
  useEffect(() => {
    let filtered = [...activities];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by activity type
    if (filterType !== 'all') {
      filtered = filtered.filter(activity => activity.type === filterType);
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      let cutoff;

      switch (dateRange) {
        case 'today':
          cutoff = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'yesterday':
          cutoff = new Date(now.setDate(now.getDate() - 1));
          cutoff.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoff = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          cutoff = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          cutoff = null;
      }

      if (cutoff) {
        filtered = filtered.filter(activity => activity.timestamp >= cutoff);
      }
    }

    setFilteredActivities(filtered);
  }, [searchQuery, filterType, dateRange, activities]);

  // Get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_added':
        return <FaUserPlus className="text-green-500" />;
      case 'user_edited':
        return <FaUserEdit className="text-blue-500" />;
      case 'account_suspended':
        return <FaUserSlash className="text-red-500" />;
      case 'course_approved':
        return <FaCheckCircle className="text-green-500" />;
      case 'course_rejected':
        return <FaTimesCircle className="text-red-500" />;
      case 'settings_updated':
        return <FaCog className="text-gray-500" />;
      case 'payment_processed':
        return <FaMoneyBillWave className="text-purple-500" />;
      default:
        return <FaHistory className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 dark:border-primary-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading activity log...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Activity Log</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track all administrative actions on the platform
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Activity Type Filter */}
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Activities</option>
              <option value="user_added">User Added</option>
              <option value="user_edited">User Edited</option>
              <option value="account_suspended">Account Suspended</option>
              <option value="course_approved">Course Approved</option>
              <option value="course_rejected">Course Rejected</option>
              <option value="settings_updated">Settings Updated</option>
              <option value="payment_processed">Payment Processed</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredActivities.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                      {activity.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {activity.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        By: {activity.admin}
                      </span>
                      <Link
                        href={activity.link}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <FaHistory className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No activities found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ActivityLogPage() {
  return (
    <AdminActivityProvider>
      <ActivityLogContent />
    </AdminActivityProvider>
  );
}

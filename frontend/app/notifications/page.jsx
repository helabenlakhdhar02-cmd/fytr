'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import { useNotifications } from '../../hooks/useNotifications';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaRegClock,
  FaFilter,
  FaSearch,
  FaTrash,
  FaCheck
} from 'react-icons/fa';
import Link from 'next/link';

const NotificationsPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Use the personalized notification hook
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    clearAllNotifications
  } = useNotifications();

  // Handle authentication redirect
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Filter notifications
  useEffect(() => {
    let filtered = [...notifications];

    // Apply type filter
    if (filter !== 'all') {
      filtered = filtered.filter(notification => notification.type === filter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [filter, searchTerm, notifications]);

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" size={18} />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-500" size={18} />;
      case 'error':
        return <FaExclamationCircle className="text-red-500" size={18} />;
      default:
        return <FaInfoCircle className="text-blue-500" size={18} />;
    }
  };

  // Delete notification (for now, just mark as read)
  const deleteNotification = (id) => {
    markAsRead(id);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Stay updated with your projects and freelancers
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  <FaCheck className="mr-2" size={14} />
                  Mark all as read ({unreadCount})
                </button>
              )}
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" size={16} />
                </div>
              </div>

              <div className="flex items-center">
                <label className="mr-2 text-sm text-gray-600 dark:text-gray-400">Filter:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All</option>
                  <option value="info">Information</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1">
                      <Link
                        href={notification.link}
                        onClick={() => markAsRead(notification.id)}
                        className="text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        <p className="text-base font-medium">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                      </Link>

                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaRegClock className="mr-1" size={14} />
                        <span>{formatDate(notification.timestamp)}</span>
                      </div>
                    </div>

                    <div className="flex items-center ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1.5 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-1"
                          title="Mark as read"
                        >
                          <FaCheck size={14} />
                        </button>
                      )}

                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Delete notification"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg">No notifications found</p>
                <p className="text-sm mt-2">
                  {searchTerm || filter !== 'all'
                    ? 'Try changing your search or filter settings'
                    : 'You have no notifications at this time'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;

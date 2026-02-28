"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser, FaArrowLeft, FaBell, FaEnvelope, FaProjectDiagram,
  FaCheckCircle, FaMoneyBillWave, FaExclamationCircle, FaFilter,
  FaCalendarAlt, FaTrash, FaEye, FaEyeSlash, FaSearch, FaSort,
  FaSortAmountDown, FaSortAmountUp, FaChevronDown
} from "react-icons/fa";

import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import { useNotifications } from "../../../hooks/useNotifications";
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

const NotificationsPage = () => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Use the personalized notification hook
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    clearAllNotifications
  } = useNotifications();

  // Remove notification (for now, just mark as read)
  const removeNotification = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    markAsRead(id);
    showToast('Notification marked as read');
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <FaEnvelope className="text-blue-500" />;
      case 'project':
        return <FaProjectDiagram className="text-green-500" />;
      case 'review':
        return <FaCheckCircle className="text-purple-500" />;
      case 'service':
        return <FaMoneyBillWave className="text-yellow-500" />;
      case 'payment':
        return <FaMoneyBillWave className="text-emerald-500" />;
      case 'system':
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter notifications
  const getFilteredNotifications = () => {
    let filtered = [...notifications];

    // Apply type filter
    if (filter !== 'all') {
      if (filter === 'unread') {
        filtered = filtered.filter(notification => !notification.isRead);
      } else {
        filtered = filtered.filter(notification => notification.type === filter);
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query)
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);

      return sortOrder === 'newest'
        ? dateB - dateA
        : dateA - dateB;
    });

    return filtered;
  };

  // Get filter counts
  const getFilterCounts = () => {
    const counts = {
      all: notifications.length,
      message: notifications.filter(n => n.type === 'message').length,
      project: notifications.filter(n => n.type === 'new_project').length,
      review: notifications.filter(n => n.type === 'review').length,
      service: notifications.filter(n => n.type === 'service').length,
      payment: notifications.filter(n => n.type === 'payment').length,
      system: notifications.filter(n => n.type === 'system').length,
      unread: notifications.filter(n => !n.isRead).length
    };

    return counts;
  };

  const filterCounts = getFilterCounts();
  const filteredNotifications = getFilteredNotifications();

  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Notifications</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load your notifications...</p>
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View and manage all your notifications
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <FaEye className="mr-2 -ml-1" size={14} />
                  Mark all as read
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <FaTrash className="mr-2 -ml-1" size={14} />
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <FaFilter className="mr-2 -ml-1" size={14} />
                {filter === 'all' ? 'All Types' :
                 filter === 'message' ? 'Messages' :
                 filter === 'project' ? 'Projects' :
                 filter === 'review' ? 'Reviews' :
                 filter === 'service' ? 'Services' :
                 filter === 'payment' ? 'Payments' :
                 filter === 'system' ? 'System' :
                 filter === 'unread' ? 'Unread' : 'Filter'}
                <FaChevronDown className="ml-2" size={12} />
              </button>

              {showFilterMenu && (
                <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setFilter('all');
                        setShowFilterMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>All Types</span>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
                        {filterCounts.all}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setFilter('message');
                        setShowFilterMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>Messages</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                        {filterCounts.message}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setFilter('project');
                        setShowFilterMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>Projects</span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">
                        {filterCounts.project}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setFilter('review');
                        setShowFilterMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>Reviews</span>
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full">
                        {filterCounts.review}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setFilter('service');
                        setShowFilterMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>Services</span>
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs px-2 py-0.5 rounded-full">
                        {filterCounts.service}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setFilter('payment');
                        setShowFilterMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>Payments</span>
                      <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs px-2 py-0.5 rounded-full">
                        {filterCounts.payment}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setFilter('system');
                        setShowFilterMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>System</span>
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs px-2 py-0.5 rounded-full">
                        {filterCounts.system}
                      </span>
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button
                      onClick={() => {
                        setFilter('unread');
                        setShowFilterMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>Unread Only</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                        {filterCounts.unread}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Button */}
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {sortOrder === 'newest' ? (
                <>
                  <FaSortAmountDown className="mr-2 -ml-1" size={14} />
                  Newest First
                </>
              ) : (
                <>
                  <FaSortAmountUp className="mr-2 -ml-1" size={14} />
                  Oldest First
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredNotifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.link}
                  onClick={() => markAsRead(notification.id)}
                  className={`block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-4">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-base font-medium ${
                            !notification.isRead
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <button
                              onClick={(e) => removeNotification(notification.id, e)}
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                              aria-label="Remove notification"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            notification.type === 'message' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            notification.type === 'project' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            notification.type === 'review' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                            notification.type === 'service' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            notification.type === 'payment' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            notification.type === 'system' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                          {!notification.isRead && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <FaBell className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No notifications found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {filter !== 'all' || searchQuery
                  ? "Try changing your filters or search query."
                  : "You don't have any notifications at the moment."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

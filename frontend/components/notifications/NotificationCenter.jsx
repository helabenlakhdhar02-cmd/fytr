'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FaBell,
  FaComment,
  FaUser,
  FaBook,
  FaVideo,
  FaGraduationCap,
  FaCheck,
  FaTrash,
  FaEllipsisH,
  FaTimes,
  FaBriefcase,
  FaEnvelope,
  FaDollarSign,
  FaUsers,
  FaFlag,
  FaCog,
  FaChartBar,
  FaInfoCircle,
  FaStar
} from 'react-icons/fa';
import Link from 'next/link';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationCenter = ({ isInstructor = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Use the personalized notification hook
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    clearAllNotifications
  } = useNotifications();

  useEffect(() => {
    // Add click event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const deleteNotification = (id) => {
    // For now, we'll just mark as read since we don't have a delete function in the hook
    // In a real implementation, you'd add a deleteNotification function to the hook
    markAsRead(id);
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'user':
        return <FaUser className="text-blue-500" />;
      case 'comment':
      case 'message':
        return <FaComment className="text-green-500" />;
      case 'book':
        return <FaBook className="text-purple-500" />;
      case 'video':
        return <FaVideo className="text-red-500" />;
      case 'graduation':
        return <FaGraduationCap className="text-yellow-500" />;
      case 'briefcase':
        return <FaBriefcase className="text-indigo-500" />;
      case 'star':
        return <FaStar className="text-yellow-500" />;
      case 'dollar':
        return <FaDollarSign className="text-green-600" />;
      case 'check':
        return <FaCheck className="text-green-500" />;
      case 'users':
        return <FaUsers className="text-blue-600" />;
      case 'flag':
        return <FaFlag className="text-red-500" />;
      case 'cog':
        return <FaCog className="text-gray-600" />;
      case 'chart':
        return <FaChartBar className="text-purple-600" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
        aria-label="Notifications"
      >
        <FaBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : notifications.length > 0 ? (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {getIcon(notification.icon)}
                      </div>
                      <div className="ml-3 flex-grow">
                        <Link
                          href={notification.link}
                          onClick={() => markAsRead(notification.id)}
                          className="block"
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {formatDate(notification.timestamp)}
                          </p>
                        </Link>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                            title="Mark as read"
                          >
                            <FaCheck className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1"
                          title="Delete notification"
                        >
                          <FaTrash className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <FaBell className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
              </div>
            )}
          </div>

          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              href={isInstructor ? "/dashboard/notifications" : "/notifications"}
              className="block text-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;

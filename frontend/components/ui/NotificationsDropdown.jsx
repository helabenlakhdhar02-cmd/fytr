'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBell, FaCircle, FaCheckCircle, FaEnvelope, 
  FaProjectDiagram, FaMoneyBillWave, FaCalendarAlt, 
  FaExclamationCircle, FaEllipsisH, FaTimes
} from 'react-icons/fa';
import Link from 'next/link';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from TechCorp Solutions',
      content: 'Hello! I wanted to discuss the React training schedule for our team.',
      timestamp: '2023-11-25T10:30:00',
      isRead: false,
      link: '/dashboard/messages/1'
    },
    {
      id: 2,
      type: 'project',
      title: 'New project request',
      content: 'You have received a new project request for JavaScript training.',
      timestamp: '2023-11-24T15:45:00',
      isRead: false,
      link: '/dashboard/active-projects'
    },
    {
      id: 3,
      type: 'review',
      title: 'New review received',
      content: 'Creative Designs Inc has left a 5-star review for your UI/UX workshop.',
      timestamp: '2023-11-23T09:15:00',
      isRead: true,
      link: '/dashboard/trainer-profile'
    },
    {
      id: 4,
      type: 'service',
      title: 'Service inquiry',
      content: 'Someone is interested in your React.js Fundamentals Training service.',
      timestamp: '2023-11-22T14:20:00',
      isRead: true,
      link: '/dashboard/services'
    },
    {
      id: 5,
      type: 'message',
      title: 'New message from WebDev Academy',
      content: 'Hi, just checking in on the JavaScript course materials. How are they coming along?',
      timestamp: '2023-11-21T13:15:00',
      isRead: true,
      link: '/dashboard/messages/2'
    }
  ];

  useEffect(() => {
    // In a real implementation, you would fetch notifications from the API
    // For now, we'll use mock data
    setNotifications(mockNotifications);
    
    // Calculate unread count
    const unread = mockNotifications.filter(notification => !notification.isRead).length;
    setUnreadCount(unread);
    
    // Add click outside listener to close dropdown
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

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
    
    // Recalculate unread count
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    const unread = updatedNotifications.filter(notification => !notification.isRead).length;
    setUnreadCount(unread);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  // Remove notification
  const removeNotification = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    
    // Recalculate unread count
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    const unread = updatedNotifications.filter(notification => !notification.isRead).length;
    setUnreadCount(unread);
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
      default:
        return <FaExclamationCircle className="text-gray-500" />;
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
        aria-label="Notifications"
      >
        <FaBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
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
          
          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div>
                {notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={notification.link}
                    onClick={() => markAsRead(notification.id)}
                    className={`block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 ${
                      !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.isRead 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.title}
                          </p>
                          <button
                            onClick={(e) => removeNotification(notification.id, e)}
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            aria-label="Remove notification"
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {notification.content}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="flex-shrink-0 ml-2">
                          <FaCircle className="text-blue-500" size={8} />
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No notifications</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/dashboard/notifications"
              className="block text-xs text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;

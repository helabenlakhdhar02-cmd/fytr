'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

// Notification service to generate user-specific notifications
export const useNotifications = () => {
  const { user } = useAuth();
  const { userData } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Generate notifications based on user role and data
  const generateUserNotifications = (currentUser, userProfile) => {
    if (!currentUser) return [];

    const now = new Date();
    const userNotifications = [];
    let notificationId = 1;

    // Get user's first name for personalization
    const firstName = currentUser.first_name || currentUser.username || 'User';
    const userRole = currentUser.role || 'client';

    // Common notification types for all users
    const commonNotifications = [
      {
        id: notificationId++,
        type: 'welcome',
        title: `Welcome back, ${firstName}!`,
        message: 'Check out the latest updates and opportunities on Fytrlance.',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        isRead: false,
        link: '/dashboard',
        icon: 'info'
      }
    ];

    // Role-specific notifications
    if (userRole === 'freelancer' || userRole === 'formateur') {
      // Trainer/Freelancer notifications
      const trainerNotifications = [
        {
          id: notificationId++,
          type: 'new_project',
          title: 'New Project Request',
          message: 'TechCorp Solutions is looking for a React.js trainer for their development team.',
          timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
          isRead: false,
          link: '/dashboard/projects',
          icon: 'briefcase'
        },
        {
          id: notificationId++,
          type: 'message',
          title: 'New Message',
          message: 'Ahmed Hassan sent you a message about the JavaScript training project.',
          timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
          isRead: false,
          link: '/dashboard/messages',
          icon: 'message'
        },
        {
          id: notificationId++,
          type: 'review',
          title: 'New Review Received',
          message: 'Creative Designs Inc left a 5-star review for your UI/UX workshop.',
          timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          isRead: true,
          link: '/dashboard/trainer-profile',
          icon: 'star'
        },
        {
          id: notificationId++,
          type: 'course_enrollment',
          title: 'New Course Enrollment',
          message: 'Sara Ahmed enrolled in your "Advanced React Patterns" course.',
          timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          isRead: true,
          link: '/dashboard/courses',
          icon: 'user'
        },
        {
          id: notificationId++,
          type: 'payment',
          title: 'Payment Received',
          message: `You received $250 for completing the "React Fundamentals" project.`,
          timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          isRead: true,
          link: '/dashboard/earnings',
          icon: 'dollar'
        }
      ];
      userNotifications.push(...trainerNotifications);
    } else if (userRole === 'client') {
      // Client notifications
      const clientNotifications = [
        {
          id: notificationId++,
          type: 'application',
          title: 'New Trainer Application',
          message: 'Mohamed Ali applied for your "React.js Training" project.',
          timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          isRead: false,
          link: '/dashboard/projects',
          icon: 'user'
        },
        {
          id: notificationId++,
          type: 'milestone',
          title: 'Milestone Completed',
          message: 'Your trainer has completed the first milestone of "JavaScript Fundamentals" project.',
          timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
          isRead: false,
          link: '/dashboard/active-projects',
          icon: 'check'
        },
        {
          id: notificationId++,
          type: 'message',
          title: 'Message from Trainer',
          message: 'Fatima Zahra sent you an update about the training schedule.',
          timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          isRead: true,
          link: '/dashboard/messages',
          icon: 'message'
        },
        {
          id: notificationId++,
          type: 'recommendation',
          title: 'Recommended Trainer',
          message: 'Based on your project requirements, we recommend checking out Hassan Ahmed\'s profile.',
          timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          isRead: true,
          link: '/fytrs',
          icon: 'star'
        }
      ];
      userNotifications.push(...clientNotifications);
    } else if (userRole === 'admin') {
      // Admin notifications
      const adminNotifications = [
        {
          id: notificationId++,
          type: 'user_registration',
          title: 'New User Registration',
          message: '5 new users registered today. Review pending verifications.',
          timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
          isRead: false,
          link: '/admin/users',
          icon: 'users'
        },
        {
          id: notificationId++,
          type: 'content_moderation',
          title: 'Content Requires Review',
          message: '3 posts have been flagged for content review.',
          timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
          isRead: false,
          link: '/admin/moderation',
          icon: 'flag'
        },
        {
          id: notificationId++,
          type: 'system',
          title: 'System Update',
          message: 'Platform maintenance scheduled for tonight at 2:00 AM.',
          timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
          isRead: true,
          link: '/admin/system',
          icon: 'cog'
        },
        {
          id: notificationId++,
          type: 'revenue',
          title: 'Monthly Revenue Report',
          message: 'Platform revenue increased by 15% this month. View detailed analytics.',
          timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          isRead: true,
          link: '/admin/analytics',
          icon: 'chart'
        }
      ];
      userNotifications.push(...adminNotifications);
    }

    // Add common notifications
    userNotifications.push(...commonNotifications);

    // Sort by timestamp (newest first)
    return userNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  // Fetch and generate notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const generatedNotifications = generateUserNotifications(user, userData);
        setNotifications(generatedNotifications);
        setUnreadCount(generatedNotifications.filter(n => !n.isRead).length);
      } catch (error) {
        console.error('Error generating notifications:', error);
        setNotifications([]);
        setUnreadCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
    }
  }, [user, userData]);

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    clearAllNotifications
  };
};

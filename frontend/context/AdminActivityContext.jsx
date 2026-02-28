'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  FaUserPlus, 
  FaUserEdit, 
  FaUserSlash, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaCog, 
  FaMoneyBillWave,
  FaHistory
} from 'react-icons/fa';

// Create context
const AdminActivityContext = createContext();

// Initial mock activities
const initialActivities = [
  {
    id: 1,
    type: 'user_added',
    icon: <FaUserPlus className="text-green-500" />,
    title: 'Added New User',
    description: 'Created account for Sarah Johnson (Trainer)',
    time: '5 minutes ago',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    admin: 'Admin User',
    link: '/admin/users'
  },
  {
    id: 2,
    type: 'course_approved',
    icon: <FaCheckCircle className="text-blue-500" />,
    title: 'Approved Course',
    description: 'Advanced React Development by Mark Wilson',
    time: '25 minutes ago',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    admin: 'Admin User',
    link: '/admin/courses'
  },
  {
    id: 3,
    type: 'account_suspended',
    icon: <FaUserSlash className="text-red-500" />,
    title: 'Suspended Account',
    description: 'User ID #4582 for policy violation',
    time: '1 hour ago',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    admin: 'Admin User',
    link: '/admin/users'
  },
  {
    id: 4,
    type: 'settings_updated',
    icon: <FaCog className="text-gray-500" />,
    title: 'Updated Settings',
    description: 'Modified platform commission rates',
    time: '3 hours ago',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    admin: 'Admin User',
    link: '/admin/settings/platform'
  },
  {
    id: 5,
    type: 'course_rejected',
    icon: <FaTimesCircle className="text-yellow-500" />,
    title: 'Rejected Course',
    description: 'Intro to Coding by Alex Brown (needs revisions)',
    time: '5 hours ago',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    admin: 'Admin User',
    link: '/admin/courses/submissions'
  }
];

// Provider component
export function AdminActivityProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load activities on mount
  useEffect(() => {
    // In a real implementation, you would fetch from an API
    // For now, we'll use the mock data
    setActivities(initialActivities);
    setIsLoaded(true);

    // You could also set up a WebSocket or polling here to get real-time updates
  }, []);

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

  // Format relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return 'just now';
    } else if (diffMin < 60) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffDay < 30) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  // Add a new activity
  const addActivity = (activity) => {
    const newActivity = {
      id: Date.now(), // Simple ID generation
      timestamp: new Date(),
      time: 'just now',
      admin: 'Admin User', // In a real app, get this from auth context
      icon: getActivityIcon(activity.type),
      ...activity
    };

    setActivities(prev => [newActivity, ...prev]);
  };

  // Clear all activities
  const clearActivities = () => {
    setActivities([]);
  };

  // Get recent activities (limited number)
  const getRecentActivities = (limit = 5) => {
    return activities.slice(0, limit);
  };

  // Update time displays
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activities.length > 0) {
        setActivities(prev => 
          prev.map(activity => ({
            ...activity,
            time: getRelativeTime(activity.timestamp)
          }))
        );
      }
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [activities]);

  return (
    <AdminActivityContext.Provider 
      value={{ 
        activities, 
        isLoaded, 
        addActivity, 
        clearActivities, 
        getRecentActivities 
      }}
    >
      {children}
    </AdminActivityContext.Provider>
  );
}

// Custom hook to use the admin activity context
export function useAdminActivity() {
  const context = useContext(AdminActivityContext);
  if (context === undefined) {
    throw new Error('useAdminActivity must be used within an AdminActivityProvider');
  }
  return context;
}

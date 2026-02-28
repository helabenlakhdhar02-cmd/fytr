'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHistory,
  FaChevronDown
} from 'react-icons/fa';
import Link from 'next/link';
import { useAdminActivity } from '../../context/AdminActivityContext';

export default function AdminActivityLog() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { activities, isLoaded, clearActivities, getRecentActivities } = useAdminActivity();
  const recentActivities = getRecentActivities(5);

  // Close dropdown when clicking outside
  useEffect(() => {
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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Activity Log Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <FaHistory className="text-primary-600 dark:text-primary-400" />
        <span className="text-sm font-medium">Recent Actions</span>
        <FaChevronDown className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        {recentActivities.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {recentActivities.length}
          </span>
        )}
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Admin Actions</h3>
              <Link
                href="/admin/activity-log"
                className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                View All
              </Link>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {isLoaded && recentActivities.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentActivities.map((activity) => (
                    <Link
                      key={activity.id}
                      href={activity.link}
                      className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                            {activity.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  {!isLoaded ? "Loading..." : "No recent activities"}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-center">
              <button
                onClick={clearActivities}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

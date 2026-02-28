'use client';

import { motion } from 'framer-motion';

export default function ActivityFeed({ activities = [] }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No recent activity to display</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          variants={itemVariants}
          className="flex items-start p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
        >
          <div className="flex-shrink-0 mr-4">
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
              {activity.icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {activity.description}
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        </motion.div>
      ))}
      
      {activities.length > 0 && (
        <div className="text-center pt-4">
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
            View All Activity
          </button>
        </div>
      )}
    </motion.div>
  );
}

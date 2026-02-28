'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaClock } from 'react-icons/fa';

const SubmissionProgressBar = ({ total, submitted, deadline }) => {
  // Calculate percentage
  const percentage = Math.round((submitted / total) * 100);
  
  // Format deadline
  const formatDeadline = (deadlineStr) => {
    if (!deadlineStr) return 'No deadline set';
    
    try {
      const date = new Date(deadlineStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return deadlineStr; // Return as is if parsing fails
    }
  };
  
  // Calculate days remaining
  const getDaysRemaining = (deadlineStr) => {
    if (!deadlineStr) return null;
    
    try {
      const deadline = new Date(deadlineStr);
      const now = new Date();
      const diffTime = deadline - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return 'Overdue';
      if (diffDays === 0) return 'Due today';
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} remaining`;
    } catch (error) {
      return null;
    }
  };
  
  const daysRemaining = getDaysRemaining(deadline);
  const formattedDeadline = formatDeadline(deadline);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Submission Progress</h2>
        <div className="flex items-center">
          <FaClock className="text-blue-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {daysRemaining}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {submitted} of {total} submitted
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <motion.div 
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
          <span className="text-gray-600 dark:text-gray-400">Submissions open until</span>
        </div>
        <span className="font-medium text-gray-800 dark:text-gray-200">{formattedDeadline}</span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">
              <FaCheck className="text-green-600 dark:text-green-400 text-xs" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Submitted</span>
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{submitted}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-1 rounded-full mr-2">
              <FaClock className="text-yellow-600 dark:text-yellow-400 text-xs" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Waiting</span>
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{total - submitted}</span>
        </div>
      </div>
      
      {percentage === 100 && (
        <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-800 p-1 rounded-full mr-2">
              <FaCheck className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-green-800 dark:text-green-300">
              All submissions received
            </span>
          </div>
        </div>
      )}
      
      {percentage < 100 && daysRemaining === 'Overdue' && (
        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-800 p-1 rounded-full mr-2">
              <FaClock className="text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-red-800 dark:text-red-300">
              Deadline passed with {total - submitted} pending submissions
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionProgressBar;

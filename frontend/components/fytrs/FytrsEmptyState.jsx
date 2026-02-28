'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaUndo } from 'react-icons/fa';

export default function FytrsEmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-200 dark:border-gray-700"
    >
      <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <FaSearch className="text-gray-400 dark:text-gray-500" size={24} />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No Fytrs match your criteria
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Try adjusting your filters or search terms to find more Fytrs, or post your task for free and let qualified freelancers come to you.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg transition-colors"
        >
          <FaUndo size={14} />
          <span>Reset Filters</span>
        </button>
        
        <button
          onClick={() => window.location.href = '/post-task'}
          className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-lg transition-colors"
        >
          <FaFilter size={14} />
          <span>Post a Task</span>
        </button>
      </div>
    </motion.div>
  );
}

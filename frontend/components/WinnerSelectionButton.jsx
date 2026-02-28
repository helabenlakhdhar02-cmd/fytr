'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const WinnerSelectionButton = ({ onSelectWinner, isDisabled = false, isWinnerSelected = false }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle button click
  const handleClick = () => {
    if (isDisabled || isWinnerSelected || success) return;
    setIsConfirmOpen(true);
  };

  // Handle confirmation
  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSelectWinner) {
        await onSelectWinner();
      }
      
      setSuccess(true);
      setIsConfirmOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error selecting winner:', error);
      setError('Failed to select winner. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <motion.button
        onClick={handleClick}
        whileHover={isDisabled || isWinnerSelected || success ? {} : { scale: 1.03 }}
        whileTap={isDisabled || isWinnerSelected || success ? {} : { scale: 0.97 }}
        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isDisabled 
            ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' 
            : success || isWinnerSelected
              ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
              : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
        }`}
        disabled={isDisabled || isLoading}
      >
        <FaTrophy className="mr-2" />
        <span className="font-medium">
          {success || isWinnerSelected ? 'Winner Selected' : 'Choose a Key'}
        </span>
        {(success || isWinnerSelected) && <FaCheck className="ml-2" />}
      </motion.button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="text-center mb-6">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <FaTrophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirm Winner Selection</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to select this freelancer as the winner? This action will:
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Mark this freelancer as the winner of the project</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Lock all other freelancers' submissions</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Mark the project as completed</span>
                  </li>
                  <li className="flex items-start text-yellow-600 dark:text-yellow-400">
                    <FaExclamationTriangle className="mt-0.5 mr-2 flex-shrink-0" />
                    <span><strong>This action cannot be undone</strong></span>
                  </li>
                </ul>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm flex items-center">
                  <FaExclamationTriangle className="mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Confirm Selection'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WinnerSelectionButton;

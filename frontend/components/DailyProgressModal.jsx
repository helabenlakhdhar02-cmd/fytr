'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaBook, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const DailyProgressModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCompletedLesson, setHasCompletedLesson] = useState(null);
  const [lastCourse, setLastCourse] = useState(null);
  const [recommendedCourse, setRecommendedCourse] = useState(null);

  useEffect(() => {
    // Check if we've shown the modal today
    const lastShown = localStorage.getItem('dailyProgressLastShown');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      // In a real app, we would fetch the user's last accessed course
      // and recommended course from the API
      
      // Simulate fetching last course
      const mockLastCourse = {
        id: 1,
        title: "Full-Stack Web Development",
        progress: 45,
        image: "/photos/Academy/full.png"
      };
      
      // Simulate fetching recommended course
      const mockRecommendedCourse = {
        id: 2,
        title: "UI/UX Design Masterclass",
        image: "/photos/Academy/react.jpeg"
      };
      
      setLastCourse(mockLastCourse);
      setRecommendedCourse(mockRecommendedCourse);
      
      // Show the modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Save that we've shown the modal today
    localStorage.setItem('dailyProgressLastShown', new Date().toDateString());
  };

  const handleYes = () => {
    setHasCompletedLesson(true);
    // In a real app, we would update the user's progress
  };

  const handleNo = () => {
    setHasCompletedLesson(false);
    // In a real app, we would record this response
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-primary-600 text-white p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold mb-2">Daily Learning Check-in</h2>
              <p className="text-primary-100">
                Track your progress and stay consistent with your learning journey.
              </p>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {hasCompletedLesson === null ? (
                // Initial question
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                    <FaBook className="text-primary-600 dark:text-primary-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Did you complete a lesson today?
                  </h3>
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleYes}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle />
                      <span>Yes</span>
                    </button>
                    <button
                      onClick={handleNo}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <FaTimesCircle />
                      <span>Not yet</span>
                    </button>
                  </div>
                </div>
              ) : hasCompletedLesson ? (
                // User completed a lesson
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                    <FaCheckCircle className="text-green-600 dark:text-green-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Great job!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Keep up the good work. Consistency is key to mastering new skills.
                  </p>
                  
                  {lastCourse && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Continue where you left off:
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-600 overflow-hidden mr-3">
                          <img 
                            src={lastCourse.image} 
                            alt={lastCourse.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {lastCourse.title}
                          </h4>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-primary-600 h-1.5 rounded-full"
                              style={{ width: `${lastCourse.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {lastCourse.progress}% complete
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Link
                    href={lastCourse ? `/Academy/courses/${lastCourse.id}` : "/Academy/courses"}
                    onClick={handleClose}
                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition-colors text-center"
                  >
                    {lastCourse ? "Continue Learning" : "Browse Courses"}
                  </Link>
                </div>
              ) : (
                // User hasn't completed a lesson
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                    <FaBook className="text-blue-600 dark:text-blue-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No problem!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Even a short 15-minute lesson can help you make progress. Here's a recommendation:
                  </p>
                  
                  {recommendedCourse && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-600 overflow-hidden mr-3">
                          <img 
                            src={recommendedCourse.image} 
                            alt={recommendedCourse.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {recommendedCourse.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Recommended for you
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <button
                      onClick={handleClose}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 rounded-lg transition-colors"
                    >
                      Maybe Later
                    </button>
                    <Link
                      href={recommendedCourse ? `/Academy/courses/${recommendedCourse.id}` : "/Academy/courses"}
                      onClick={handleClose}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition-colors text-center"
                    >
                      Start Learning
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DailyProgressModal;

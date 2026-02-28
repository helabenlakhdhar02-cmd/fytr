'use client';

import React from 'react';
import { FaUserCog, FaQuestionCircle } from 'react-icons/fa';

const ProjectActions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        Actions
      </h3>

      <div className="space-y-4">
        {/* Choose Key Action */}
        <button className="w-full bg-black text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-y-[-2px] group">
          <FaUserCog className="mr-2 group-hover:animate-spin" />
          <span>Choose a Key</span>
        </button>

        {/* Support Action */}
        <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-lg flex items-center justify-center hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]">
          <FaQuestionCircle className="mr-2 text-blue-500" />
          <span>Get Support</span>
        </button>

        {/* Additional Action */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">Need Help?</h4>
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">Check our documentation for tips on creating successful submissions.</p>
          <a href="#" className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            View Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectActions;

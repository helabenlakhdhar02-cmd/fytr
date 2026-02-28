'use client';

import React from 'react';
import { FaCheck, FaCircle } from 'react-icons/fa';

const ProjectTimeline = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        Project Timeline
      </h3>

      <div className="relative pl-8 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
        {/* Timeline Item 1 */}
        <div className="relative">
          <div className="absolute -left-8 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800">
              <FaCheck className="text-green-600 dark:text-green-400 text-xs" />
            </div>
          </div>
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <p className="font-medium text-gray-900 dark:text-white flex items-center">
              Project Created
              <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">Completed</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Apr 15, 2025</p>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative">
          <div className="absolute -left-8 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800">
              <FaCheck className="text-green-600 dark:text-green-400 text-xs" />
            </div>
          </div>
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <p className="font-medium text-gray-900 dark:text-white flex items-center">
              Freelancers Assigned
              <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">Completed</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Apr 16, 2025</p>
          </div>
        </div>

        {/* Timeline Item 3 - Current */}
        <div className="relative">
          <div className="absolute -left-8 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800 animate-pulse">
              <FaCircle className="text-blue-600 dark:text-blue-400 text-[8px]" />
            </div>
          </div>
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <p className="font-medium text-gray-900 dark:text-white flex items-center">
              Submissions Open
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">In Progress</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Until Apr 22, 2025</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">4 of 6 freelancers submitted</p>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="relative opacity-50">
          <div className="absolute -left-8 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800">
              <FaCircle className="text-gray-400 dark:text-gray-500 text-[8px]" />
            </div>
          </div>
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <p className="font-medium text-gray-900 dark:text-white">Project Complete</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Apr 25, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
